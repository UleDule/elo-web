import type { Dictionary } from '../types'

export const id: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Unduh',
  scanToJoin: 'Pindai untuk bergabung',
  scanToClaim: 'Pindai untuk mengambil slot',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Belum punya app? Kami arahkan ke toko.',
  goToStore: 'Buka toko',

  join: {
    youAreInvited: 'Kamu diundang',
    joinHeadline: (name) => `Gabung ke ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} pemain`,
    downloadAppToJoin: 'Unduh app untuk bergabung ke',
    joinButton: 'Gabung ke papan skor',
    posterCta: 'Unduh ELO Rankings dan gabung ke papan skor ini',
  },

  claim: {
    youAreInvited: 'Kamu diundang',
    spotAs: 'Slot untuk',
    takeSpot: 'Ambil slot ini',
    takeSpotExplainer:
      'Kamu akan masuk ke slot pemain ini. ELO dan riwayat pertandingan tetap tersimpan. Nama, avatar, dan negaramu akan menggantikan profil tamu.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Pertandingan' : 'Pertandingan'),
    matchesPlayedLabel: (count) =>
      count === 1 ? 'Pertandingan dimainkan' : 'Pertandingan dimainkan',
    scanToClaim: 'Pindai untuk mengambil slot',
    claimButton: 'Ambil slot ini',
    downloadAppToClaim: 'Unduh app untuk mengambil slotmu di',
  },

  language: 'Bahasa',

  sports: {
    table_tennis: 'Tenis meja',
    chess: 'Catur',
    billiards: 'Biliar',
    tennis: 'Tenis',
    padel: 'Padel',
    darts: 'Darts',
    foosball: 'Foosball',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Bulu tangkis',
    pool: 'Pool',
    arm_wrestling: 'Adu panco',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Lainnya',
  },
}
