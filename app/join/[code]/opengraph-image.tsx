import { ImageResponse } from 'next/og'
import { getScoreboard, formatGameType } from './lib'

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
          backgroundColor: '#181622',
          backgroundImage:
            'radial-gradient(ellipse at center, #2D1B69 0%, #181622 70%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: '#D4AAFF',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 30,
            display: 'flex',
          }}
        >
          You're invited to join
        </div>
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 35,
            maxWidth: '95%',
            color: '#ffffff',
            display: 'flex',
            textShadow: '0 0 40px rgba(184,90,255,0.6)',
          }}
        >
          {name}
        </div>
        {sb && (
          <div
            style={{
              fontSize: 38,
              color: '#9B95A8',
              marginBottom: 60,
              display: 'flex',
            }}
          >
            {gameType} · {playerCount} player{playerCount !== 1 ? 's' : ''}
          </div>
        )}
        <div
          style={{
            padding: '22px 50px',
            borderRadius: 24,
            backgroundColor: '#B85AFF',
            color: '#ffffff',
            fontSize: 42,
            fontWeight: 800,
            display: 'flex',
            boxShadow: '0 0 40px rgba(184,90,255,0.5)',
          }}
        >
          ELO Rankings
        </div>
      </div>
    ),
    { ...size },
  )
}
