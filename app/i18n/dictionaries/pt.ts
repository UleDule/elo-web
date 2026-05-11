import type { Dictionary } from '../types'

export const pt: Dictionary = {
  appName: 'ELO Rankings',
  download: 'Baixar',
  scanToJoin: 'Escaneie para entrar',
  scanToClaim: 'Escaneie para assumir este lugar',
  appStore: 'App Store',
  googlePlay: 'Google Play',
  dontHaveApp: 'Não tem o app? A gente te leva para a loja.',
  goToStore: 'Abrir a loja',

  join: {
    youAreInvited: 'Você foi convidado',
    joinHeadline: (name) => `Entre em ${name}`,
    metaLine: (gameType, playerCount) =>
      `${gameType} · ${playerCount} ${playerCount === 1 ? 'jogador' : 'jogadores'}`,
    downloadAppToJoin: 'Baixe o app para entrar em',
    joinButton: 'Entrar no placar',
    posterCta: 'Baixe ELO Rankings e entre neste placar',
  },

  claim: {
    youAreInvited: 'Você foi convidado',
    spotAs: 'O lugar de',
    takeSpot: 'Assumir o lugar',
    takeSpotExplainer:
      'Você assume o lugar deste jogador. ELO e histórico de partidas são preservados. Seu nome, avatar e país substituem o perfil de convidado.',
    eloLabel: 'ELO',
    matchesLabel: (count) => (count === 1 ? 'Partida' : 'Partidas'),
    matchesPlayedLabel: (count) => (count === 1 ? 'Partida jogada' : 'Partidas jogadas'),
    scanToClaim: 'Escaneie para assumir este lugar',
    claimButton: 'Assumir o lugar',
    downloadAppToClaim: 'Baixe o app para assumir seu lugar em',
  },

  language: 'Idioma',

  sports: {
    table_tennis: 'Tênis de mesa',
    chess: 'Xadrez',
    billiards: 'Bilhar',
    tennis: 'Tênis',
    padel: 'Padel',
    darts: 'Dardos',
    foosball: 'Pebolim',
    fifa: 'FIFA',
    smash_bros: 'Smash Bros',
    badminton: 'Badminton',
    pool: 'Sinuca',
    arm_wrestling: 'Queda de braço',
    go: 'Go',
    backgammon: 'Gamão',
    petanque: 'Petanca',
    other: 'Outro',
  },
}
