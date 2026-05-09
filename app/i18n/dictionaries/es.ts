import type { Dictionary } from '../types'

export const es: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Descargar',
  scanToJoin: 'Escanea para unirte',
  scanToClaim: 'Escanea para reclamar este lugar',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: '¿No tienes la app? Te llevamos a la tienda.',
  goToStore: 'Abrir la tienda',

  join: {
    youAreInvited: 'Estás invitado',
    joinHeadline: (name) => `Únete a ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${playerCount === 1 ? 'jugador' : 'jugadores'}`,
    downloadAppToJoin: 'Descarga la app para unirte a',
    joinButton: 'Unirme a la clasificación',
    posterCta: 'Descarga ELO Rankings y únete a esta clasificación',
  },

  claim: {
    youAreInvited: 'Estás invitado',
    spotAs: 'El lugar de',
    takeSpot: 'Reclamar el lugar',
    takeSpotExplainer:
      'Reclamas el lugar de este jugador. El ELO y el historial de partidas se conservan. Tu nombre, avatar y país reemplazarán el perfil de invitado.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Partida' : 'Partidas'),
    matchesPlayedLabel: (count) => (count === 1 ? 'Partida jugada' : 'Partidas jugadas'),
    scanToClaim: 'Escanea para reclamar este lugar',
    claimButton: 'Reclamar el lugar',
    downloadAppToClaim: 'Descarga la app para reclamar tu lugar en',
  },

  language: 'Idioma',

  sports: {
    table_tennis: 'Tenis de mesa',
    chess: 'Ajedrez',
    billiards: 'Billar',
    tennis: 'Tenis',
    padel: 'Pádel',
    darts: 'Dardos',
    foosball: 'Fútbol de mesa',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Bádminton',
    pool: 'Pool',
    arm_wrestling: 'Lucha de brazos',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Petanca',
    other: 'Otro',
  },
}
