import type { Dictionary } from '../types'

export const sq: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Shkarko',
  scanToJoin: 'Skano për t\'u bashkuar',
  scanToClaim: 'Skano për të marrë vendin',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'S\'e ke aplikacionin? Ne të çojmë te dyqani.',
  goToStore: 'Shko te dyqani',

  join: {
    youAreInvited: 'Je i ftuar',
    joinHeadline: (name) => `Bashkohu në ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} lojtarë`,
    downloadAppToJoin: 'Shkarko aplikacionin për t\'u bashkuar te',
    joinButton: 'Bashkohu në tabelë',
    posterCta: 'Shkarko ELO Rankings dhe bashkohu në këtë tabelë',
  },

  claim: {
    youAreInvited: 'Je i ftuar',
    spotAs: 'Vendi si',
    takeSpot: 'Merr këtë vend',
    takeSpotExplainer:
      'Do të zësh vendin e këtij lojtari. ELO dhe historiku i ndeshjeve ruhen. Emri, avatari dhe shteti yt zëvendësojnë profilin e vizitorit.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Ndeshje' : 'Ndeshje'),
    matchesPlayedLabel: (count) =>
      count === 1 ? 'Ndeshje të luajtura' : 'Ndeshje të luajtura',
    scanToClaim: 'Skano për të marrë vendin',
    claimButton: 'Merr këtë vend',
    downloadAppToClaim: 'Shkarko aplikacionin për të marrë vendin tënd te',
  },

  language: 'Gjuha',

  sports: {
    table_tennis: 'Ping pong',
    chess: 'Shah',
    billiards: 'Bilardo',
    tennis: 'Tenis',
    padel: 'Padel',
    darts: 'Darts',
    foosball: 'Kalçeto',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Mundja e krahëve',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Tjetër',
  },
}
