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
    joinButton: 'Åpne i app',
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
    claimButton: 'Åpne i app',
    downloadAppToClaim: 'Last ned appen for å ta plassen i',
  },

  language: 'Språk',
}
