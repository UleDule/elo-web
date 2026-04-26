import { cache } from 'react'
import { createServiceClient } from '@/app/lib/supabase'

// --- types ---

export type ClaimContext = {
  code: string
  list_id: string
  list_name: string
  game_type: string
  guest_name: string
  guest_elo: number
  guest_total_games: number
}

export function formatGameType(type: string): string {
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// --- data ---

// Slår opp en pending claim-lenke + listen og gjeste-spilleren den peker på.
// Returnerer null hvis lenken er ukjent, ikke pending, utløpt, eller hvis
// gjeste-raden allerede er claimet (guest_name = NULL etter overtakelse).
export const getClaim = cache(
  async (code: string): Promise<ClaimContext | null> => {
    const supabase = createServiceClient()

    const { data: link } = await supabase
      .from('guest_claim_links')
      .select('list_id, status, expires_at, guest_player_id')
      .eq('invite_code', code)
      .maybeSingle()

    if (!link) return null
    if (link.status !== 'pending') return null
    if (new Date(link.expires_at) < new Date()) return null

    const [listResult, guestResult] = await Promise.all([
      supabase
        .from('ranking_lists')
        .select('id, name, game_type')
        .eq('id', link.list_id)
        .maybeSingle(),
      supabase
        .from('list_players')
        .select('guest_name, elo, total_games')
        .eq('id', link.guest_player_id)
        .maybeSingle(),
    ])

    const list = listResult.data
    const guest = guestResult.data
    if (!list || !guest) return null
    if (!guest.guest_name) return null // allerede claimet

    return {
      code,
      list_id: list.id,
      list_name: list.name,
      game_type: list.game_type,
      guest_name: guest.guest_name,
      guest_elo: guest.elo ?? 1000,
      guest_total_games: guest.total_games ?? 0,
    }
  }
)
