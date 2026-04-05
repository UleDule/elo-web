import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
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

  // Read the trophy logo from the public folder and inline it as base64
  // so Satori can render it reliably (no network fetch at render time).
  const logoBuffer = await readFile(
    join(process.cwd(), 'public', 'logo', 'TrofeTransparens.png'),
  )
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#181622',
          backgroundImage:
            'radial-gradient(ellipse at center, #2D1B69 0%, #181622 75%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px 80px',
        }}
      >
        {/* Left: trophy logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 440,
            height: 440,
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="ELO Rankings"
            width={440}
            height={440}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 60px rgba(184,90,255,0.8))',
            }}
          />
        </div>

        {/* Right: text column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 50,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#D4AAFF',
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 18,
              display: 'flex',
            }}
          >
            You're invited
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.0,
              marginBottom: 24,
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
                fontSize: 32,
                color: '#9B95A8',
                marginBottom: 28,
                display: 'flex',
              }}
            >
              {gameType} · {playerCount} player{playerCount !== 1 ? 's' : ''}
            </div>
          )}
          <div
            style={{
              padding: '16px 36px',
              borderRadius: 18,
              backgroundColor: '#B85AFF',
              color: '#ffffff',
              fontSize: 32,
              fontWeight: 800,
              display: 'flex',
              alignSelf: 'flex-start',
              boxShadow: '0 0 40px rgba(184,90,255,0.5)',
            }}
          >
            ELO Rankings
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
