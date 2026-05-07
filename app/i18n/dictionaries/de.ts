import type { Dictionary } from '../types'

export const de: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Herunterladen',
  scanToJoin: 'Scannen zum Beitreten',
  scanToClaim: 'Scannen, um den Platz zu übernehmen',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp:
    'Du hast die App noch nicht? Wir bringen dich in den Store.',
  goToStore: 'Zum Store',

  join: {
    youAreInvited: 'Du bist eingeladen',
    joinHeadline: (name) => `${name} beitreten`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${playerCount === 1 ? 'Spieler' : 'Spieler'}`,
    downloadAppToJoin: 'Lade die App herunter, um beizutreten:',
    joinButton: 'Tabelle beitreten',
    posterCta: 'Lade ELO Rankings herunter und tritt dieser Tabelle bei',
  },

  claim: {
    youAreInvited: 'Du bist eingeladen',
    spotAs: 'Der Platz als',
    takeSpot: 'Platz übernehmen',
    takeSpotExplainer:
      'Du übernimmst den Platz dieser Person. ELO und Spielverlauf bleiben erhalten. Name, Avatar und Land ersetzen das Gastprofil.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Spiel' : 'Spiele'),
    matchesPlayedLabel: (count) =>
      count === 1 ? 'Spiel' : 'Spiele gespielt',
    scanToClaim: 'Scannen, um den Platz zu übernehmen',
    claimButton: 'Platz übernehmen',
    downloadAppToClaim: 'Lade die App herunter, um den Platz zu übernehmen in',
  },

  language: 'Sprache',

  sports: {
    table_tennis: 'Tischtennis',
    chess: 'Schach',
    billiards: 'Billard',
    tennis: 'Tennis',
    padel: 'Padel',
    darts: 'Darts',
    foosball: 'Tischfußball',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Armdrücken',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Andere',
  },
}
