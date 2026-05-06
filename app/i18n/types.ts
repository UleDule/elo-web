// Dictionary type for all localized strings on the web.
// Mirror naming where it makes sense with mobile app's app_xx.arb keys.
//
// When adding a new key: add it here first, then add to all dictionary files
// in dictionaries/. TypeScript will fail compilation if a language is missing
// a key, which is the desired behavior.

export type Dictionary = {
  // Shared
  appName: string
  download: string
  scanToJoin: string
  scanToClaim: string
  appStore: string
  googlePlay: string
  dontHaveApp: string
  goToStore: string

  // Join page
  join: {
    youAreInvited: string
    // {0} = scoreboard name (used in <strong>{name}</strong> below)
    joinHeadline: (name: string) => string
    // {0} = game type, {1} = player count formatted (already pluralized)
    metaLine: (gameType: string, playerCount: number) => string
    downloadAppToJoin: string
    joinButton: string
  }

  // Claim page
  claim: {
    youAreInvited: string
    // Hero subline: "The spot as <name> · <gametype>"
    spotAs: string
    takeSpot: string
    // Explanation paragraph below avatar
    takeSpotExplainer: string
    eloLabel: string
    matchesLabel: (count: number) => string
    matchesPlayedLabel: (count: number) => string
    scanToClaim: string
    claimButton: string
    downloadAppToClaim: string
  }

  // Language switcher
  language: string
}

export type LangCode = 'en' | 'nb' | 'de' | 'ru'

export const SUPPORTED_LANGS: LangCode[] = ['en', 'nb', 'de', 'ru']
export const DEFAULT_LANG: LangCode = 'en'

export function isSupportedLang(
  code: string | null | undefined,
): code is LangCode {
  return !!code && SUPPORTED_LANGS.includes(code as LangCode)
}
