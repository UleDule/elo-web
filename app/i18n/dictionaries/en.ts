import type { Dictionary } from '../types'

export const en: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Download',
  scanToJoin: 'Scan to join',
  scanToClaim: 'Scan to take the spot',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: "Don't have the app? We'll take you to the store.",
  goToStore: 'Go to store',

  join: {
    youAreInvited: "You're invited",
    joinHeadline: (name) => `Join ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} player${playerCount !== 1 ? 's' : ''}`,
    downloadAppToJoin: 'Download the app to join',
    joinButton: 'Open in app',
    posterCta: 'Download ELO Rankings and join this leaderboard',
  },

  claim: {
    youAreInvited: "You're invited",
    spotAs: 'The spot as',
    takeSpot: "Take the spot",
    takeSpotExplainer:
      "You'll take the spot as this player. ELO and match history are preserved. Your name, avatar and country replace the guest profile.",
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Match' : 'Matches'),
    matchesPlayedLabel: (count) => (count === 1 ? 'Match' : 'Matches played'),
    scanToClaim: 'Scan to take the spot',
    claimButton: 'Open in app',
    downloadAppToClaim: 'Download the app to take the spot in',
  },

  language: 'Language',

  sports: {
    table_tennis: 'Table tennis',
    chess: 'Chess',
    billiards: 'Billiards',
    tennis: 'Tennis',
    padel: 'Padel',
    darts: 'Darts',
    foosball: 'Foosball',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Arm wrestling',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Other',
  },
}
