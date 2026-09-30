'use client'

import { FormEvent, useState } from 'react'
import { company } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'config'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)

    if (!accessKey) {
      setStatus('config')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Wiadomość ze strony GPRO',
          from_name: 'Strona GPRO',
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? '').trim() || 'nie podano',
          message: String(data.get('message') ?? ''),
        }),
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null
      if (!result?.success) {
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
    <form className="contact-form" onSubmit={onSubmit} autoComplete="on">
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
