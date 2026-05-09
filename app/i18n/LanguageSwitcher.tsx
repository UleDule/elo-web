'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { LangCode } from './types'
import { SUPPORTED_LANGS } from './types'

// Inline SVGs for reliable rendering across platforms (Windows in particular
// has no flag emoji in system fonts, falling back to "RU RU" text glyphs).
function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" width="20" height="14" aria-hidden="true">
      <clipPath id="t"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" /></clipPath>
      <path d="M0,0v30h60v-30z" fill="#012169" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 60,30M60,0 0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

function FlagNO() {
  return (
    <svg viewBox="0 0 22 16" width="20" height="14" aria-hidden="true">
      <rect width="22" height="16" fill="#EF2B2D" />
      <rect x="6" width="2" height="16" fill="#fff" />
      <rect y="7" width="22" height="2" fill="#fff" />
      <rect x="6.5" width="1" height="16" fill="#002868" />
      <rect y="7.5" width="22" height="1" fill="#002868" />
    </svg>
  )
}

function FlagDE() {
  return (
    <svg viewBox="0 0 5 3" width="20" height="14" aria-hidden="true">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  )
}

function FlagRU() {
  return (
    <svg viewBox="0 0 9 6" width="20" height="14" aria-hidden="true">
      <rect width="9" height="2" y="0" fill="#fff" />
      <rect width="9" height="2" y="2" fill="#0039A6" />
      <rect width="9" height="2" y="4" fill="#D52B1E" />
    </svg>
  )
}

function FlagPL() {
  return (
    <svg viewBox="0 0 8 5" width="20" height="14" aria-hidden="true">
      <rect width="8" height="2.5" y="0" fill="#fff" stroke="#ccc" strokeWidth="0.05" />
      <rect width="8" height="2.5" y="2.5" fill="#DC143C" />
    </svg>
  )
}

const LABELS: Record<LangCode, { flag: () => React.ReactElement; name: string }> = {
  en: { flag: FlagGB, name: 'English' },
  nb: { flag: FlagNO, name: 'Norsk' },
  de: { flag: FlagDE, name: 'Deutsch' },
  ru: { flag: FlagRU, name: 'Русский' },
  pl: { flag: FlagPL, name: 'Polski' },
}

const STORAGE_KEY = 'elorankings.lang'

export default function LanguageSwitcher({ current }: { current: LangCode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  // Persist override so a returning visitor keeps their choice even if they
  // arrive via a link that specifies a different language.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (
      stored &&
      SUPPORTED_LANGS.includes(stored as LangCode) &&
      stored !== current &&
      !searchParams.get('lang')
    ) {
      // User previously chose a different language, and this visit didn't
      // come with an explicit ?lang. Honor the stored preference.
      const params = new URLSearchParams(searchParams.toString())
      params.set('lang', stored)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [current, pathname, router, searchParams])

  function pick(lang: LangCode) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang)
    }
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', lang)
    router.replace(`${pathname}?${params.toString()}`)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors"
        style={{
          background: 'rgba(184,90,255,0.1)',
          border: '1px solid rgba(184,90,255,0.2)',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {(() => { const F = LABELS[current].flag; return <F /> })()}
        <span className="text-white text-xs font-medium uppercase tracking-wider">
          {current}
        </span>
        <svg
          className={`w-3 h-3 text-white/60 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 5 6 8 9 5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 rounded-xl py-1 min-w-[160px] z-50"
          style={{
            background: '#1E1B2E',
            border: '1px solid rgba(184,90,255,0.2)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
          role="listbox"
        >
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => pick(lang)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors hover:brightness-150 ${
                lang === current ? 'text-white' : 'text-white/70'
              }`}
              style={
                lang === current
                  ? { background: 'rgba(184,90,255,0.15)' }
                  : undefined
              }
              role="option"
              aria-selected={lang === current}
            >
              {(() => { const F = LABELS[lang].flag; return <F /> })()}
              <span>{LABELS[lang].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
