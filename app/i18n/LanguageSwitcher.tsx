'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { LangCode } from './types'
import { SUPPORTED_LANGS } from './types'

// Flag SVGs from country-flag-icons (MIT). 3x2-ratio variant matches the
// proportions of most national flags. We import only the country codes we
// use so tree-shaking keeps the bundle small.
//
// Flag emoji (🇰🇷 etc.) renders as fallback text "RU RU" on Windows because
// Windows system fonts have no flag emoji glyphs — that's why we use SVGs.
import GB from 'country-flag-icons/react/3x2/GB'
import NO from 'country-flag-icons/react/3x2/NO'
import DE from 'country-flag-icons/react/3x2/DE'
import RU from 'country-flag-icons/react/3x2/RU'
import PL from 'country-flag-icons/react/3x2/PL'
import SA from 'country-flag-icons/react/3x2/SA'
import FR from 'country-flag-icons/react/3x2/FR'
import ES from 'country-flag-icons/react/3x2/ES'
import TR from 'country-flag-icons/react/3x2/TR'
import JP from 'country-flag-icons/react/3x2/JP'
import KR from 'country-flag-icons/react/3x2/KR'
import VN from 'country-flag-icons/react/3x2/VN'

const flagProps = { width: 24, height: 17, 'aria-hidden': true }

const LABELS: Record<LangCode, { flag: () => React.ReactElement; name: string }> = {
  en: { flag: () => <GB {...flagProps} />, name: 'English' },
  nb: { flag: () => <NO {...flagProps} />, name: 'Norsk' },
  de: { flag: () => <DE {...flagProps} />, name: 'Deutsch' },
  ru: { flag: () => <RU {...flagProps} />, name: 'Русский' },
  pl: { flag: () => <PL {...flagProps} />, name: 'Polski' },
  ar: { flag: () => <SA {...flagProps} />, name: 'العربية' },
  fr: { flag: () => <FR {...flagProps} />, name: 'Français' },
  es: { flag: () => <ES {...flagProps} />, name: 'Español' },
  tr: { flag: () => <TR {...flagProps} />, name: 'Türkçe' },
  ja: { flag: () => <JP {...flagProps} />, name: '日本語' },
  ko: { flag: () => <KR {...flagProps} />, name: '한국어' },
  vi: { flag: () => <VN {...flagProps} />, name: 'Tiếng Việt' },
}

const STORAGE_KEY = 'elorankings.lang'

// Visnings-rekkefølge i drop-down: engelsk først (fallback for alle som ikke
// finner sitt eget språk), så resten alfabetisk på lokalt navn (Deutsch,
// English, Español, ...). Bevisst forskjellig fra SUPPORTED_LANGS som er
// teknisk rekkefølge.
//
// Eksplisitt 'en' locale på localeCompare for å få konsistent rekkefølge på
// tvers av enheter. Uten argument bruker localeCompare brukerens system-
// locale, som gir forskjellig CJK-plassering på PC vs mobil — vi vil at
// alle ser samme rekkefølge uansett.
const DISPLAY_ORDER: LangCode[] = (() => {
  const rest = SUPPORTED_LANGS.filter((l) => l !== 'en').sort((a, b) =>
    LABELS[a].name.localeCompare(LABELS[b].name, 'en'),
  )
  return ['en', ...rest]
})()

export default function LanguageSwitcher({ current }: { current: LangCode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click/touch outside, and on Escape key.
  useEffect(() => {
    if (!open) return
    function handlePointer(e: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('touchstart', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('touchstart', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

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
    <div className="relative" ref={containerRef}>
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
          {DISPLAY_ORDER.map((lang, idx) => (
            <div key={lang}>
              {/* Tynn skille mellom engelsk (toppen) og resten av språkene
                  som er sortert alfabetisk. Markerer at engelsk er
                  prioritert/fallback, ikke del av alfabetisk lista. */}
              {idx === 1 && (
                <div
                  style={{
                    height: 1,
                    margin: '4px 8px',
                    background: 'rgba(184,90,255,0.15)',
                  }}
                />
              )}
            <button
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
