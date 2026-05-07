import type { Dictionary } from '../types'

export const nb: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Last ned',
  scanToJoin: 'Skann for å bli med',
  scanToClaim: 'Skann for å ta plassen',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Har du ikke appen? Vi tar deg til butikken.',
  goToStore: 'Gå til butikk',

  join: {
    youAreInvited: 'Du er invitert',
    joinHeadline: (name) => `Bli med i ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${playerCount === 1 ? 'spiller' : 'spillere'}`,
    downloadAppToJoin: 'Last ned appen for å bli med i',
    joinButton: 'Bli med i scoreboardet',
    posterCta: 'Last ned ELO Rankings og bli med i scoreboardet',
  },

  claim: {
    youAreInvited: 'Du er invitert',
    spotAs: 'Plassen som',
    takeSpot: 'Ta plassen',
    takeSpotExplainer:
      'Du tar over plassen som denne spilleren. ELO og kamphistorikk bevares. Navn, avatar og land erstattes med dine.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Kamp' : 'Kamper'),
    matchesPlayedLabel: (count) => (count === 1 ? 'Kamp' : 'Kamper spilt'),
    scanToClaim: 'Skann for å ta plassen',
    claimButton: 'Ta plassen',
    downloadAppToClaim: 'Last ned appen for å ta plassen i',
  },

  language: 'Språk',

  sports: {
    table_tennis: 'Bordtennis',
    chess: 'Sjakk',
    billiards: 'Biljard',
    tennis: 'Tennis',
    padel: 'Padel',
    darts: 'Dart',
    foosball: 'Foosball',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Pool',
    arm_wrestling: 'Håndbak',
    go: 'Go',
    backgammon: 'Backgammon',
    petanque: 'Pétanque',
    other: 'Annet',
  },
}
