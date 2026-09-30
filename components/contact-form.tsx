'use client'

import { FocusEvent, FormEvent, useState } from 'react'
import { company } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'config'

function unlockField(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  event.currentTarget.readOnly = false
}

const noAutofill = {
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
  readOnly: true,
  onFocus: unlockField,
  'data-lpignore': 'true',
  'data-1p-ignore': 'true',
  'data-form-type': 'other',
} as const

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

    const name = String(data.get('gpro_name') ?? '').trim()
    const email = String(data.get('gpro_mail') ?? '').trim()
    const phone = String(data.get('gpro_phone') ?? '').trim()
    const message = String(data.get('gpro_message') ?? '').trim()

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
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
          name,
          email,
          phone: phone || 'nie podano',
          message,
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
    <form className="contact-form" onSubmit={onSubmit} autoComplete="off">
      <h3>Napisz do nas</h3>
      <p className="form-intro">Odpowiemy na temat dostępności i współpracy hurtowej. Pola uzupełnij ręcznie.</p>

      <label>
        Imię i nazwisko
        <input name="gpro_name" type="text" required maxLength={120} {...noAutofill} />
      </label>
      <label>
        E-mail
        <input name="gpro_mail" type="text" inputMode="email" required maxLength={160} {...noAutofill} />
      </label>
      <label>
        Telefon
        <input name="gpro_phone" type="text" inputMode="tel" maxLength={40} {...noAutofill} />
      </label>
      <label>
        Wiadomość
        <textarea name="gpro_message" required maxLength={4000} rows={5} {...noAutofill} />
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
