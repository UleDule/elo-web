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

export function formatGameType(type: string): string {
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
        'id, elo, total_games, guest_name, profiles(display_name, avatar_url)'
      )
      .eq('list_id', list.id)
      .order('elo', { ascending: false })

    return { ...list, players: (players ?? []) as PlayerRow[] }
  }
)
