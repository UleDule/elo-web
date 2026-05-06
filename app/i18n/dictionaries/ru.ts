import type { Dictionary } from '../types'

// Russian has 4 plural categories: one / few / many / other.
// one: 1, 21, 31... (ends in 1, except 11)
// few: 2-4, 22-24... (ends in 2-4, except 12-14)
// many: 0, 5-20, 25-30...
function ruPlural<T>(n: number, one: T, few: T, many: T): T {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export const ru: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Скачать',
  scanToJoin: 'Сканируй, чтобы присоединиться',
  scanToClaim: 'Сканируй, чтобы занять место',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Нет приложения? Мы откроем магазин.',
  goToStore: 'Открыть магазин',

  join: {
    youAreInvited: 'Тебя пригласили',
    joinHeadline: (name) => `Присоединяйся к ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${ruPlural(
        playerCount,
        'игрок',
        'игрока',
        'игроков',
      )}`,
    downloadAppToJoin: 'Скачай приложение, чтобы присоединиться к',
    joinButton: 'Открыть в приложении',
    posterCta: 'Скачай ELO Rankings и присоединяйся к этой таблице',
  },

  claim: {
    youAreInvited: 'Тебя пригласили',
    spotAs: 'Место как',
    takeSpot: 'Занять место',
    takeSpotExplainer:
      'Ты займёшь место этого игрока. ELO и история матчей сохранятся. Имя, аватар и страна заменят гостевой профиль.',
    eloLabel: 'ELO',
    matchesLabel: (count) =>
      ruPlural(count, 'матч', 'матча', 'матчей'),
    matchesPlayedLabel: (count) =>
      ruPlural(count, 'матч сыгран', 'матча сыграно', 'матчей сыграно'),
    scanToClaim: 'Сканируй, чтобы занять место',
    claimButton: 'Открыть в приложении',
    downloadAppToClaim: 'Скачай приложение, чтобы занять место в',
  },

  language: 'Язык',

  sports: {
    table_tennis: 'Настольный теннис',
    chess: 'Шахматы',
    billiards: 'Бильярд',
    tennis: 'Теннис',
    padel: 'Падел',
    darts: 'Дартс',
    foosball: 'Настольный футбол',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Бадминтон',
    pool: 'Пул',
    arm_wrestling: 'Армрестлинг',
    go: 'Го',
    backgammon: 'Нарды',
    petanque: 'Петанк',
    other: 'Другое',
  },
}
