'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { LangCode } from './types'
import { SUPPORTED_LANGS } from './types'

const LABELS: Record<LangCode, { flag: string; name: string }> = {
  en: { flag: '🇬🇧', name: 'English' },
  nb: { flag: '🇳🇴', name: 'Norsk' },
  de: { flag: '🇩🇪', name: 'Deutsch' },
  ru: { flag: '🇷🇺', name: 'Русский' },
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
        <span>{LABELS[current].flag}</span>
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
              <span>{LABELS[lang].flag}</span>
              <span>{LABELS[lang].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
