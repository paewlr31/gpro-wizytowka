import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const key = process.env.WEB3FORMS_ACCESS_KEY?.trim()
  if (!key) {
    return NextResponse.json({ ok: false, reason: 'config' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  if (String(body.company ?? '').trim()) {
    return NextResponse.json({ ok: true })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: key,
      subject: 'Wiadomość ze strony GPRO',
      from_name: 'Strona GPRO',
      name,
      email,
      phone: phone || 'nie podano',
      message,
    }),
  })

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null
  if (!response.ok || !result?.success) {
    return NextResponse.json({ ok: false, reason: 'provider' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
