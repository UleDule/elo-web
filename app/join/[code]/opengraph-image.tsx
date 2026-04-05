import { ImageResponse } from 'next/og'
import { getScoreboard, formatGameType } from './lib'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }
export const alt = 'Join on ELO Rankings'

type Props = { params: Promise<{ code: string }> }

export default async function Image({ params }: Props) {
  const { code } = await params
  const sb = await getScoreboard(code)
  const name = sb?.name ?? 'ELO Rankings'
  const playerCount = sb?.players.length ?? 0
  const gameType = sb ? formatGameType(sb.game_type) : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #181622 0%, #2D1B69 50%, #181622 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#B85AFF',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 30,
          }}
        >
          You&apos;re invited
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 40,
            maxWidth: '90%',
            background: 'linear-gradient(135deg, #ffffff 0%, #B85AFF 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {name}
        </div>
        {sb && (
          <div
            style={{
              fontSize: 38,
              color: '#9B95A8',
              marginBottom: 50,
            }}
          >
            {gameType} · {playerCount} player{playerCount !== 1 ? 's' : ''}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '20px 40px',
            borderRadius: 20,
            background: 'rgba(184,90,255,0.15)',
            border: '2px solid rgba(184,90,255,0.5)',
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          ELO Rankings
        </div>
      </div>
    ),
    { ...size },
  )
}
