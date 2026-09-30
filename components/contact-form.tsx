'use client'

import { FormEvent, useState } from 'react'
import { company } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'config'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')

    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? ''),
          message: String(data.get('message') ?? ''),
          company: String(data.get('company') ?? ''),
        }),
      })
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean
        reason?: string
      } | null

      if (result?.reason === 'config') {
        setStatus('config')
        return
      }
      if (!response.ok || !result?.ok) {
        setStatus('error')
        return
      }

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h3>Napisz do nas</h3>
      <p className="form-intro">Odpowiemy na temat dostępności i współpracy hurtowej.</p>

      <label>
        Imię i nazwisko
        <input name="name" type="text" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" required maxLength={160} />
      </label>
      <label>
        Telefon
        <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
      </label>
      <label>
        Wiadomość
        <textarea name="message" required maxLength={4000} rows={5} />
      </label>

      <input className="honey" type="text" name="company" tabIndex={-1} autoComplete="off" />

      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
      </button>

      {status === 'sent' ? (
        <p className="form-status ok" role="status">
          Dziękujemy. Wiadomość została wysłana.
        </p>
      ) : null}
      {status === 'config' ? (
        <p className="form-status bad" role="alert">
          Formularz nie jest jeszcze podłączony. Brak klucza Web3Forms na serwerze.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="form-status bad" role="alert">
          Nie udało się wysłać wiadomości. Zadzwoń pod {company.phone} albo napisz na {company.email}.
        </p>
      ) : null}
    </form>
  )
}
