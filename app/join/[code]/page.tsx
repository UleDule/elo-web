import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { createServiceClient } from '@/app/lib/supabase'

type Player = {
  id: string
  elo: number
  wins: number
  losses: number
  total_games: number
  guest_name: string | null
  profiles: { display_name: string | null }[] | null
}

type Scoreboard = {
  id: string
  name: string
  game_type: string
  invite_code: string
  players: Player[]
}

const getScoreboard = cache(async (code: string): Promise<Scoreboard | null> => {
  const supabase = createServiceClient()

  const { data: list } = await supabase
    .from('ranking_lists')
    .select('id, name, game_type, invite_code')
    .eq('invite_code', code)
    .single()

  if (!list) return null

  const { data: players } = await supabase
    .from('list_players')
    .select('id, elo, wins, losses, total_games, guest_name, profiles(display_name)')
    .eq('list_id', list.id)
    .order('elo', { ascending: false })

  return { ...list, players: (players ?? []) as Player[] }
})

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const scoreboard = await getScoreboard(code)

  if (!scoreboard) return { title: 'ELO Rankings' }

  return {
    title: `${scoreboard.name} – ELO Rankings`,
    description: `Du er invitert til å bli med i ${scoreboard.name}. Last ned ELO Rankings-appen for å registrere kamper.`,
    openGraph: {
      title: `Bli med i ${scoreboard.name}`,
      description: `${scoreboard.players.length} spillere konkurrerer. Last ned appen for å bli med!`,
      siteName: 'ELO Rankings',
    },
  }
}

const GAME_TYPE_LABELS: Record<string, string> = {
  table_tennis: 'Bordtennis',
  chess: 'Sjakk',
  pool: 'Biljard',
  darts: 'Dart',
  ping_pong: 'Ping pong',
}

export default async function JoinPage({ params }: Props) {
  const { code } = await params
  const scoreboard = await getScoreboard(code)

  if (!scoreboard) notFound()

  const joinUrl = `https://elorankings.com/join/${code}`
  const deepLink = `com.example.elo_rankings://join/${code}`

  const qrDataUrl = await QRCode.toDataURL(joinUrl, {
    width: 220,
    margin: 2,
    color: { dark: '#18181b', light: '#ffffff' },
  })

  const gameLabel = GAME_TYPE_LABELS[scoreboard.game_type] ?? scoreboard.game_type

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* Logo / app name */}
        <p className="text-center text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-8">
          ELO Rankings
        </p>

        {/* Scoreboard header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">{scoreboard.name}</h1>
          <p className="text-zinc-500 mt-1 text-sm">{gameLabel} · {scoreboard.players.length} spillere</p>
        </div>

        {/* Player list */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-zinc-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Rankingliste</span>
          </div>
          <ol>
            {scoreboard.players.slice(0, 15).map((player, i) => {
              const name = player.profiles?.[0]?.display_name ?? player.guest_name ?? 'Ukjent'
              const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null
              return (
                <li
                  key={player.id}
                  className={`flex items-center px-5 py-3 gap-3 ${i < scoreboard.players.length - 1 ? 'border-b border-zinc-50' : ''}`}
                >
                  <span className="w-7 text-sm font-bold text-center text-zinc-300">
                    {medal ?? `${i + 1}`}
                  </span>
                  <span className="flex-1 text-zinc-900 font-medium truncate">{name}</span>
                  <span className="text-sm font-bold text-zinc-900 tabular-nums">{player.elo}</span>
                  <span className="text-xs text-zinc-400 tabular-nums w-14 text-right">
                    {player.wins}V {player.losses}T
                  </span>
                </li>
              )
            })}
            {scoreboard.players.length > 15 && (
              <li className="px-5 py-3 text-center text-xs text-zinc-400">
                + {scoreboard.players.length - 15} flere spillere
              </li>
            )}
          </ol>
        </div>

        {/* CTA: Download app */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
          <p className="text-zinc-600 text-sm text-center mb-5">
            Last ned <strong>ELO Rankings</strong> for å registrere kamper og bli med i <strong>{scoreboard.name}</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* App Store */}
            <a
              href="https://apps.apple.com/app/elo-rankings/id6749603706"
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl py-3 px-4 text-sm font-semibold hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.nordicworks.elorankings"
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl py-3 px-4 text-sm font-semibold hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.35.2.74.24 1.12.12l12.5-7.08-2.5-2.5-11.12 9.46zM.5 1.12C.19 1.5 0 2.06 0 2.78v18.44c0 .72.19 1.28.51 1.65l.08.08 10.33-10.33v-.24L.58 1.04.5 1.12zM20.31 9.64l-2.68-1.52-2.82 2.82 2.82 2.82 2.69-1.53c.77-.43.77-1.15-.01-1.59zM4.3.12L16.8 7.2l-2.5 2.5L4.3.12z"/>
              </svg>
              Google Play
            </a>
          </div>

          {/* QR code – desktop only */}
          <div className="hidden sm:flex flex-col items-center border-t border-zinc-100 pt-5">
            <img
              src={qrDataUrl}
              alt={`QR-kode for å laste ned ELO Rankings og bli med i ${scoreboard.name}`}
              width={160}
              height={160}
              className="rounded-lg"
            />
            <p className="text-xs text-zinc-400 mt-2 text-center">Scan for å åpne på mobilen</p>
          </div>
        </div>

        {/* Deep link fallback */}
        <p className="text-center mt-4">
          <a href={deepLink} className="text-xs text-zinc-400 hover:text-zinc-600">
            Har du appen allerede? Åpne →
          </a>
        </p>

      </div>
    </div>
  )
}
