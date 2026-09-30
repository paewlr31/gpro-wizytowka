'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'O nas' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/oferta', label: 'Oferta' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <a className="skip" href="#tresc">
        Przejdź do treści
      </a>
      <Link className="brand" href="/" onClick={close}>
        <img src="/logo-gpro.jpg" alt="GPRO" />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Główna nawigacja">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : undefined}
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
