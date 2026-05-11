import type { Dictionary } from '../types'

export const it: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Scarica',
  scanToJoin: 'Scansiona per partecipare',
  scanToClaim: 'Scansiona per prendere questo posto',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Non hai l\'app? Ti portiamo allo store.',
  goToStore: 'Apri lo store',

  join: {
    youAreInvited: 'Sei invitato',
    joinHeadline: (name) => `Partecipa a ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${playerCount === 1 ? 'giocatore' : 'giocatori'}`,
    downloadAppToJoin: 'Scarica l\'app per partecipare a',
    joinButton: 'Partecipa alla classifica',
    posterCta: 'Scarica ELO Rankings e partecipa a questa classifica',
  },

  claim: {
    youAreInvited: 'Sei invitato',
    spotAs: 'Il posto di',
    takeSpot: 'Prendi il posto',
    takeSpotExplainer:
      'Prendi il posto di questo giocatore. ELO e cronologia partite si conservano. Nome, avatar e paese sostituiranno il profilo ospite.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Partita' : 'Partite'),
    matchesPlayedLabel: (count) => (count === 1 ? 'Partita giocata' : 'Partite giocate'),
    scanToClaim: 'Scansiona per prendere questo posto',
    claimButton: 'Prendi il posto',
    downloadAppToClaim: 'Scarica l\'app per prendere il posto in',
  },

  language: 'Lingua',

  sports: {
    table_tennis: 'Ping pong',
    chess: 'Scacchi',
    billiards: 'Biliardo',
    tennis: 'Tennis',
    padel: 'Padel',
    darts: 'Freccette',
    foosball: 'Calcio balilla',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Braccio di ferro',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Altro',
  },
}
