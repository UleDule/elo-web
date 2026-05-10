import type { Dictionary } from '../types'

export const ja: Dictionary = {
  appName: 'ELO Rankings',
  download: 'ダウンロード',
  scanToJoin: 'スキャンして参加',
  scanToClaim: 'スキャンしてこの枠を引き継ぐ',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'アプリをお持ちでないですか？ストアへ移動します。',
  goToStore: 'ストアを開く',

  join: {
    youAreInvited: '招待されています',
    joinHeadline: (name) => `${name}に参加`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · プレイヤー${playerCount}人`,
    downloadAppToJoin: 'アプリをダウンロードして参加：',
    joinButton: 'ランキングに参加',
    posterCta: 'ELO Rankingsをダウンロードしてこのランキングに参加',
  },

  claim: {
    youAreInvited: '招待されています',
    spotAs: 'プレイヤー枠',
    takeSpot: '枠を引き継ぐ',
    takeSpotExplainer:
      'このプレイヤーの枠を引き継ぎます。ELOと試合履歴は保持されます。あなたの名前、アバター、国がゲストプロフィールに置き換わります。',
    eloLabel: 'ELO',
    matchesLabel: () => '試合',
    matchesPlayedLabel: () => '試合数',
    scanToClaim: 'スキャンしてこの枠を引き継ぐ',
    claimButton: '枠を引き継ぐ',
    downloadAppToClaim: 'アプリをダウンロードして枠を引き継ぐ：',
  },

  language: '言語',

  sports: {
    table_tennis: '卓球',
    chess: 'チェス',
    billiards: 'ビリヤード',
    tennis: 'テニス',
    padel: 'パデル',
    darts: 'ダーツ',
    foosball: 'テーブルサッカー',
    fifa: 'FIFA',
    smash_bros: 'スマブラ',
    badminton: 'バドミントン',
    pool: 'プールビリヤード',
    arm_wrestling: '腕相撲',
    go: '囲碁',
    backgammon: 'バックギャモン',
    petanque: 'ペタンク',
    other: 'その他',
  },
}
