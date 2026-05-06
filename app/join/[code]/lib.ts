import { cache } from 'react'
import { createServiceClient } from '@/app/lib/supabase'

// --- types ---

export type ProfileData = {
  display_name: string | null
  avatar_url: string | null
}

export type PlayerRow = {
  id: string
  elo: number
  total_games: number
  guest_name: string | null
  user_id: string | null
  // Supabase returns object for many-to-one FK, or null for guest players
  profiles: ProfileData | ProfileData[] | null
}

export type Scoreboard = {
  id: string
  name: string
  game_type: string
  invite_code: string
  players: PlayerRow[]
}

export function getProfile(p: PlayerRow): ProfileData | null {
  if (!p.profiles) return null
  if (Array.isArray(p.profiles)) return p.profiles[0] ?? null
  return p.profiles
}

// Type for the sports dictionary section. Indexed by the same keys as
// Sports.xxxKey in mobile (lib/constants/sports.dart).
type SportsDict = {
  [key: string]: string
}

export function formatGameType(type: string, sports?: SportsDict): string {
  // First: try to look up by stable DB key (table_tennis, chess, padel...).
  // Custom user-typed sports won't be in the dictionary — fall back to the
  // raw stored string with light cleanup so it still looks presentable.
  if (sports && sports[type]) return sports[type]
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// --- data ---

export const getScoreboard = cache(
  async (code: string): Promise<Scoreboard | null> => {
    const supabase = createServiceClient()

    const { data: list } = await supabase
      .from('ranking_lists')
      .select('id, name, game_type, invite_code')
      .eq('invite_code', code)
      .single()

    if (!list) return null

    const { data: players } = await supabase
      .from('list_players')
      .select(
        'id, elo, total_games, guest_name, user_id, profiles(display_name, avatar_url)'
      )
      .eq('list_id', list.id)
      .order('elo', { ascending: false })

    // Filter out players who have left the scoreboard. Their list_players row
    // is kept so that match history still resolves names, but they should not
    // appear in the public leaderboard / OG image / poster on the web.
    const { data: members } = await supabase
      .from('list_members')
      .select('user_id')
      .eq('list_id', list.id)

    const activeMemberIds = new Set(
      (members ?? []).map((m) => m.user_id as string)
    )

    const visiblePlayers = ((players ?? []) as PlayerRow[]).filter(
      (p) => p.user_id === null || activeMemberIds.has(p.user_id)
    )

    return { ...list, players: visiblePlayers }
  }
)
