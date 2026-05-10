import 'server-only'
import { headers } from 'next/headers'
import { en } from './dictionaries/en'
import { nb } from './dictionaries/nb'
import { de } from './dictionaries/de'
import { ru } from './dictionaries/ru'
import { pl } from './dictionaries/pl'
import { ar } from './dictionaries/ar'
import { fr } from './dictionaries/fr'
import { es } from './dictionaries/es'
import { tr } from './dictionaries/tr'
import { ja } from './dictionaries/ja'
import { ko } from './dictionaries/ko'
import type { Dictionary, LangCode } from './types'
import { DEFAULT_LANG, isSupportedLang } from './types'

const dictionaries: Record<LangCode, Dictionary> = { en, nb, de, ru, pl, ar, fr, es, tr, ja, ko }

/**
 * Resolve the user's preferred language with this priority:
 *   1. ?lang= query parameter (set by Flutter when sharing a link)
 *   2. Accept-Language header from the browser
 *   3. DEFAULT_LANG (English)
 *
 * The query parameter is the primary signal because it represents the
 * sender's intent: "I sent this link from a Norwegian app, so the recipient
 * should land on a Norwegian page." The recipient can override via the
 * language switcher if they prefer.
 */
export async function resolveLang(searchLang?: string): Promise<LangCode> {
  if (isSupportedLang(searchLang)) return searchLang

  const acceptLanguage = (await headers()).get('accept-language') ?? ''
  // Accept-Language is e.g. "nb-NO,nb;q=0.9,en-US;q=0.8,en;q=0.7"
  const parts = acceptLanguage.split(',').map((p) => p.trim().split(';')[0])
  for (const part of parts) {
    const primary = part.split('-')[0].toLowerCase()
    if (isSupportedLang(primary)) return primary
  }

  return DEFAULT_LANG
}

export async function getDictionary(searchLang?: string): Promise<{
  lang: LangCode
  t: Dictionary
}> {
  const lang = await resolveLang(searchLang)
  return { lang, t: dictionaries[lang] }
}

export { SUPPORTED_LANGS, DEFAULT_LANG, isSupportedLang } from './types'
export type { Dictionary, LangCode } from './types'
