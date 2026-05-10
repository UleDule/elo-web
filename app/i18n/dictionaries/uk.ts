import type { Dictionary } from '../types'

// Ukrainian has 4 plural categories: one / few / many / other.
// Same rules as Russian:
// one: 1, 21, 31... (ends in 1, except 11)
// few: 2-4, 22-24... (ends in 2-4, except 12-14)
// many: 0, 5-20, 25-30...
function ukPlural<T>(n: number, one: T, few: T, many: T): T {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export const uk: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Завантажити',
  scanToJoin: 'Скануй, щоб приєднатися',
  scanToClaim: 'Скануй, щоб зайняти місце',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Немає застосунку? Ми відкриємо магазин.',
  goToStore: 'Відкрити магазин',

  join: {
    youAreInvited: 'Тебе запросили',
    joinHeadline: (name) => `Приєднуйся до ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${ukPlural(
        playerCount,
        'гравець',
        'гравці',
        'гравців',
      )}`,
    downloadAppToJoin: 'Завантаж застосунок, щоб приєднатися до',
    joinButton: 'Приєднатися',
    posterCta: 'Завантаж ELO Rankings і приєднуйся до цієї таблиці',
  },

  claim: {
    youAreInvited: 'Тебе запросили',
    spotAs: 'Місце як',
    takeSpot: 'Зайняти місце',
    takeSpotExplainer:
      'Ти займеш місце цього гравця. ELO та історія матчів збережуться. Твоє ім\'я, аватар і країна замінять гостьовий профіль.',
    eloLabel: 'ELO',
    matchesLabel: (count) =>
      ukPlural(count, 'матч', 'матчі', 'матчів'),
    matchesPlayedLabel: (count) =>
      ukPlural(count, 'матч зіграно', 'матчі зіграно', 'матчів зіграно'),
    scanToClaim: 'Скануй, щоб зайняти місце',
    claimButton: 'Зайняти місце',
    downloadAppToClaim: 'Завантаж застосунок, щоб зайняти місце в',
  },

  language: 'Мова',

  sports: {
    table_tennis: 'Настільний теніс',
    chess: 'Шахи',
    billiards: 'Більярд',
    tennis: 'Теніс',
    padel: 'Падел',
    darts: 'Дартс',
    foosball: 'Настільний футбол',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Бадмінтон',
    pool: 'Пул',
    arm_wrestling: 'Армрестлінг',
    go: 'Ґо',
    backgammon: 'Нарди',
    petanque: 'Петанк',
    other: 'Інше',
  },
}
