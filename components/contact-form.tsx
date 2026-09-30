'use client'

import { FormEvent, useState } from 'react'
import { company } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    if (String(data.get('_honey') ?? '').trim()) {
      setStatus('sent')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(company.formEmail)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: String(data.get('name') ?? ''),
            email: String(data.get('email') ?? ''),
            phone: String(data.get('phone') ?? '').trim() || 'nie podano',
            message: String(data.get('message') ?? ''),
            _subject: 'Wiadomość ze strony GPRO',
            _template: 'table',
            _captcha: 'false',
          }),
        },
      )
      const result = (await response.json().catch(() => null)) as { success?: string | boolean } | null
      const ok = response.ok && (result?.success === true || result?.success === 'true')
      if (!ok) {
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
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
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

      <input className="honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
      </button>

      {status === 'sent' ? (
        <p className="form-status ok" role="status">
          Dziękujemy. Wiadomość została wysłana.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="form-status bad" role="alert">
          Nie udało się wysłać formularza. Zadzwoń pod {company.phone} albo napisz na {company.email}.
        </p>
      ) : null}
    </form>
  )
}
