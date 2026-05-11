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
    // Subline on the printable QR poster ("Download ELO Rankings and join...")
    posterCta: string
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

  // Sport names. Keys match Sports.xxxKey in mobile app
  // (lib/constants/sports.dart). Custom user-typed sports are not in this
  // map and fall back to the raw stored string in formatGameType().
  sports: {
    table_tennis: string
    chess: string
    billiards: string
    tennis: string
    padel: string
    darts: string
    foosball: string
    fifa: string
    smash_bros: string
    badminton: string
    pool: string
    arm_wrestling: string
    go: string
    backgammon: string
    petanque: string
    other: string
  }
}

export type LangCode = 'en' | 'nb' | 'de' | 'ru' | 'pl' | 'ar' | 'fr' | 'es' | 'tr' | 'ja' | 'ko' | 'vi' | 'uk' | 'it'

export const SUPPORTED_LANGS: LangCode[] = ['en', 'nb', 'de', 'ru', 'pl', 'ar', 'fr', 'es', 'tr', 'ja', 'ko', 'vi', 'uk', 'it']
export const DEFAULT_LANG: LangCode = 'en'

export function isSupportedLang(
  code: string | null | undefined,
): code is LangCode {
  return !!code && SUPPORTED_LANGS.includes(code as LangCode)
}
