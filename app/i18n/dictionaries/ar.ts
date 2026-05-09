import type { Dictionary } from '../types'

// Arabic has 6 plural categories per CLDR:
// zero: 0
// one: 1
// two: 2
// few: n % 100 = 3..10
// many: n % 100 = 11..99
// other: 100, 101, 102, 200, ... and fractions
function arPlural<T>(
  n: number,
  zero: T,
  one: T,
  two: T,
  few: T,
  many: T,
  other: T,
): T {
  const mod100 = n % 100
  if (n === 0) return zero
  if (n === 1) return one
  if (n === 2) return two
  if (mod100 >= 3 && mod100 <= 10) return few
  if (mod100 >= 11 && mod100 <= 99) return many
  return other
}

export const ar: Dictionary = {
  appName: 'ELO Rankings',
  download: 'تنزيل',
  scanToJoin: 'امسح للانضمام',
  scanToClaim: 'امسح الرمز لاستلام هذا المكان',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'ليس لديك التطبيق؟ سننقلك إلى المتجر.',
  goToStore: 'فتح المتجر',

  join: {
    youAreInvited: 'لديك دعوة',
    joinHeadline: (name) => `انضم إلى ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${arPlural(
        playerCount,
        'لاعب',
        'لاعب',
        'لاعبان',
        'لاعبين',
        'لاعبًا',
        'لاعب',
      )}`,
    downloadAppToJoin: 'حمّل التطبيق للانضمام إلى',
    joinButton: 'انضم إلى اللوحة',
    posterCta: 'حمّل ELO Rankings وانضم إلى هذه اللوحة',
  },

  claim: {
    youAreInvited: 'لديك دعوة',
    spotAs: 'المكان باسم',
    takeSpot: 'استلم المكان',
    takeSpotExplainer:
      'ستستلم مكان هذا اللاعب. يبقى ELO وسجل المباريات. سيحلّ اسمك وصورتك ودولتك محل ملف الضيف.',
    eloLabel: 'ELO',
    matchesLabel: (count) =>
      arPlural(count, 'مباراة', 'مباراة', 'مباراتان', 'مباريات', 'مباراةً', 'مباراة'),
    matchesPlayedLabel: (count) =>
      arPlural(
        count,
        'مباراة ملعوبة',
        'مباراة ملعوبة',
        'مباراتان ملعوبتان',
        'مباريات ملعوبة',
        'مباراةً ملعوبة',
        'مباراة ملعوبة',
      ),
    scanToClaim: 'امسح الرمز لاستلام هذا المكان',
    claimButton: 'استلم المكان',
    downloadAppToClaim: 'حمّل التطبيق لاستلام مكانك في',
  },

  language: 'اللغة',

  sports: {
    table_tennis: 'تنس الطاولة',
    chess: 'الشطرنج',
    billiards: 'البلياردو',
    tennis: 'التنس',
    padel: 'البادل',
    darts: 'دارتس',
    foosball: 'كرة الطاولة',
    fifa: 'FIFA',
    smash_bros: 'سماش بروس',
    badminton: 'الريشة الطائرة',
    pool: 'البلياردو الأمريكي',
    arm_wrestling: 'مصارعة الذراع',
    go: 'غو',
    backgammon: 'طاولة الزهر',
    petanque: 'بيتانك',
    other: 'أخرى',
  },
}
