import type { Dictionary } from '../types'

export const vi: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Tải xuống',
  scanToJoin: 'Quét để tham gia',
  scanToClaim: 'Quét để tiếp quản vị trí',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Chưa có ứng dụng? Chuyển đến cửa hàng.',
  goToStore: 'Mở cửa hàng',

  join: {
    youAreInvited: 'Bạn được mời',
    joinHeadline: (name) => `Tham gia ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} người chơi`,
    downloadAppToJoin: 'Tải ứng dụng để tham gia:',
    joinButton: 'Tham gia bảng xếp hạng',
    posterCta: 'Tải ELO Rankings và tham gia bảng xếp hạng này',
  },

  claim: {
    youAreInvited: 'Bạn được mời',
    spotAs: 'Vị trí của',
    takeSpot: 'Tiếp quản vị trí',
    takeSpotExplainer:
      'Tiếp quản vị trí của người chơi này. ELO và lịch sử trận đấu được giữ lại. Tên, ảnh đại diện và quốc gia của bạn sẽ thay thế hồ sơ khách.',
    eloLabel: 'ELO',
    matchesLabel: () => 'trận',
    matchesPlayedLabel: () => 'số trận',
    scanToClaim: 'Quét để tiếp quản vị trí',
    claimButton: 'Tiếp quản vị trí',
    downloadAppToClaim: 'Tải ứng dụng để tiếp quản vị trí:',
  },

  language: 'Ngôn ngữ',

  sports: {
    table_tennis: 'Bóng bàn',
    chess: 'Cờ vua',
    billiards: 'Bi-a',
    tennis: 'Quần vợt',
    padel: 'Padel',
    darts: 'Phi tiêu',
    foosball: 'Bi lắc',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Cầu lông',
    pool: 'Bi-a lỗ',
    arm_wrestling: 'Vật tay',
    go: 'Cờ vây',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Khác',
  },
}
