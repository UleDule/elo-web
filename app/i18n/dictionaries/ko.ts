import type { Dictionary } from '../types'

export const ko: Dictionary = {
  appName: 'ELO Rankings',
  download: '다운로드',
  scanToJoin: '스캔해서 참가',
  scanToClaim: '스캔해서 자리 이어받기',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: '앱이 설치되어 있지 않나요? 스토어로 이동해요.',
  goToStore: '스토어 열기',

  join: {
    youAreInvited: '초대되었습니다',
    joinHeadline: (name) => `${name}에 참가`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · 플레이어 ${playerCount}명`,
    downloadAppToJoin: '앱을 다운로드해서 참가:',
    joinButton: '랭킹보드에 참가',
    posterCta: 'ELO Rankings를 다운로드해서 이 랭킹보드에 참가',
  },

  claim: {
    youAreInvited: '초대되었습니다',
    spotAs: '플레이어 자리',
    takeSpot: '자리 이어받기',
    takeSpotExplainer:
      '이 플레이어의 자리를 이어받아요. ELO와 경기 기록은 유지돼요. 게스트 프로필이 본인의 이름·아바타·국가로 바뀌어요.',
    eloLabel: 'ELO',
    matchesLabel: () => '경기',
    matchesPlayedLabel: () => '경기 수',
    scanToClaim: '스캔해서 자리 이어받기',
    claimButton: '자리 이어받기',
    downloadAppToClaim: '앱을 다운로드해서 자리 이어받기:',
  },

  language: '언어',

  sports: {
    table_tennis: '탁구',
    chess: '체스',
    billiards: '당구',
    tennis: '테니스',
    padel: '파델',
    darts: '다트',
    foosball: '테이블 축구',
    fifa: 'FIFA',
    smash_bros: '스매시브라더스',
    badminton: '배드민턴',
    pool: '포켓볼',
    arm_wrestling: '팔씨름',
    go: '바둑',
    backgammon: '백개먼',
    petanque: '페탕크',
    other: '기타',
  },
}
