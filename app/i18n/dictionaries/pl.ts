import type { Dictionary } from '../types'

// Polish has 4 plural categories: one / few / many / other.
// Same rules as Russian:
// one: 1
// few: 2-4 (except 12-14)
// many: 0, 5-21+, and 12-14
// other: fractions
function plPlural<T>(n: number, one: T, few: T, many: T): T {
  const mod10 = n % 10
  const mod100 = n % 100
  if (n === 1) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export const pl: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Pobierz',
  scanToJoin: 'Zeskanuj, aby dołączyć',
  scanToClaim: 'Zeskanuj, aby zająć miejsce',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Nie masz aplikacji? Zabierzemy cię do sklepu.',
  goToStore: 'Otwórz sklep',

  join: {
    youAreInvited: 'Masz zaproszenie',
    joinHeadline: (name) => `Dołącz do ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${plPlural(
        playerCount,
        'gracz',
        'graczy',
        'graczy',
      )}`,
    downloadAppToJoin: 'Pobierz aplikację, aby dołączyć do',
    joinButton: 'Dołącz do tablicy',
    posterCta: 'Pobierz ELO Rankings i dołącz do tej tablicy',
  },

  claim: {
    youAreInvited: 'Masz zaproszenie',
    spotAs: 'Miejsce jako',
    takeSpot: 'Zajmij miejsce',
    takeSpotExplainer:
      'Zajmiesz miejsce tego gracza. ELO i historia meczów zostaną zachowane. Twoje imię, awatar i kraj zastąpią profil gościa.',
    eloLabel: 'ELO',
    matchesLabel: (count) =>
      plPlural(count, 'Mecz', 'Mecze', 'Meczów'),
    matchesPlayedLabel: (count) =>
      plPlural(count, 'Rozegrany mecz', 'Rozegrane mecze', 'Rozegranych meczów'),
    scanToClaim: 'Zeskanuj, aby zająć miejsce',
    claimButton: 'Zajmij miejsce',
    downloadAppToClaim: 'Pobierz aplikację, aby zająć miejsce w',
  },

  language: 'Język',

  sports: {
    table_tennis: 'Tenis stołowy',
    chess: 'Szachy',
    billiards: 'Bilard',
    tennis: 'Tenis',
    padel: 'Padel',
    darts: 'Dart',
    foosball: 'Piłkarzyki',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Siłowanie na rękę',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Inne',
  },
}
