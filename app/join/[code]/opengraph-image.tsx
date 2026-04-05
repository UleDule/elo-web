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
          backgroundColor: '#1A0B33',
          backgroundImage:
            'radial-gradient(circle at 30% 50%, #4A1F8C 0%, #1A0B33 60%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px 80px',
        }}
      >
        {/* Left: trophy logo (no drop-shadow filter — causes visible box
            artifacts when messengers crop/compress the image) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="ELO Rankings"
          width={420}
          height={420}
          style={{
            objectFit: 'contain',
            flexShrink: 0,
          }}
        />

        {/* Right: text column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 60,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: '#E5C8FF',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'flex',
            }}
          >
            You're invited
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              lineHeight: 1.0,
              marginBottom: 30,
              color: '#ffffff',
              display: 'flex',
            }}
          >
            {name}
          </div>
          {sb && (
            <div
              style={{
                fontSize: 46,
                fontWeight: 500,
                color: '#C9BFDB',
                marginBottom: 38,
                display: 'flex',
              }}
            >
              {gameType} · {playerCount} player{playerCount !== 1 ? 's' : ''}
            </div>
          )}
          <div
            style={{
              padding: '22px 48px',
              borderRadius: 22,
              backgroundColor: '#B85AFF',
              color: '#ffffff',
              fontSize: 44,
              fontWeight: 800,
              display: 'flex',
              alignSelf: 'flex-start',
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
