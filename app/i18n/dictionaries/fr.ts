import type { Dictionary } from '../types'

export const fr: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Télécharger',
  scanToJoin: 'Scanne pour rejoindre',
  scanToClaim: 'Scanne pour récupérer cette place',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: "T'as pas l'appli ? On t'amène au store.",
  goToStore: 'Ouvrir le store',

  join: {
    youAreInvited: 'Tu es invité',
    joinHeadline: (name) => `Rejoins ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${playerCount === 1 ? 'joueur' : 'joueurs'}`,
    downloadAppToJoin: "Télécharge l'appli pour rejoindre",
    joinButton: 'Rejoindre le classement',
    posterCta: 'Télécharge ELO Rankings et rejoins ce classement',
  },

  claim: {
    youAreInvited: 'Tu es invité',
    spotAs: 'La place de',
    takeSpot: 'Récupérer la place',
    takeSpotExplainer:
      "Tu récupères la place de ce joueur. L'ELO et l'historique des matchs sont conservés. Ton nom, ton avatar et ton pays remplaceront le profil invité.",
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Match' : 'Matchs'),
    matchesPlayedLabel: (count) => (count === 1 ? 'Match joué' : 'Matchs joués'),
    scanToClaim: 'Scanne pour récupérer cette place',
    claimButton: 'Récupérer la place',
    downloadAppToClaim: "Télécharge l'appli pour récupérer ta place dans",
  },

  language: 'Langue',

  sports: {
    table_tennis: 'Tennis de table',
    chess: 'Échecs',
    billiards: 'Billard',
    tennis: 'Tennis',
    padel: 'Padel',
    darts: 'Fléchettes',
    foosball: 'Baby-foot',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Bras de fer',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Autre',
  },
}
