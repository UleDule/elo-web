import type { Dictionary } from '../types'

export const tr: Dictionary = {
  appName: 'ELO Rankings',
  download: 'İndir',
  scanToJoin: 'Katılmak için tara',
  scanToClaim: 'Bu yeri sahiplenmek için tara',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Uygulaman yok mu? Mağazaya götürelim.',
  goToStore: 'Mağazayı aç',

  join: {
    youAreInvited: 'Davet edildin',
    joinHeadline: (name) => `${name} sıralamasına katıl`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} oyuncu`,
    downloadAppToJoin: 'Katılmak için uygulamayı indir:',
    joinButton: 'Sıralamaya katıl',
    posterCta: 'ELO Rankings\'i indir ve bu sıralamaya katıl',
  },

  claim: {
    youAreInvited: 'Davet edildin',
    spotAs: 'Yer şu kişi olarak',
    takeSpot: 'Yeri sahiplen',
    takeSpotExplainer:
      'Bu oyuncunun yerini sahiplenirsin. ELO ve maç geçmişi korunur. Adın, avatarın ve ülken misafir profilinin yerini alır.',
    eloLabel: 'ELO',
    matchesLabel: () => 'Maç',
    matchesPlayedLabel: () => 'Oynanan maç',
    scanToClaim: 'Bu yeri sahiplenmek için tara',
    claimButton: 'Yeri sahiplen',
    downloadAppToClaim: 'Yerini sahiplenmek için uygulamayı indir:',
  },

  language: 'Dil',

  sports: {
    table_tennis: 'Masa tenisi',
    chess: 'Satranç',
    billiards: 'Bilardo',
    tennis: 'Tenis',
    padel: 'Padel',
    darts: 'Dart',
    foosball: 'Langırt',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool bilardo',
    arm_wrestling: 'Bilek güreşi',
    go: 'Go',
    backgammon: 'Tavla',
    petanque: 'Petank',
    other: 'Diğer',
  },
}
