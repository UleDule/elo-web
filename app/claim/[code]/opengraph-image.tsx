import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getClaim, formatGameType } from './lib'

export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }
export const alt = 'Take over an account on ELO Rankings'

type Props = { params: Promise<{ code: string }> }

export default async function Image({ params }: Props) {
  const { code } = await params
  const claim = await getClaim(code)
  const guestName = claim?.guest_name ?? 'Player'
  const listName = claim?.list_name ?? 'ELO Rankings'
  const elo = claim?.guest_elo ?? 1000
  const games = claim?.guest_total_games ?? 0
  const gameType = claim ? formatGameType(claim.game_type) : ''

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
              fontSize: 38,
              fontWeight: 700,
              color: '#E5C8FF',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 18,
              display: 'flex',
            }}
          >
            You&apos;re invited
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.0,
              marginBottom: 16,
              color: '#ffffff',
              display: 'flex',
            }}
          >
            {listName}
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 500,
              color: '#C9BFDB',
              marginBottom: 30,
              display: 'flex',
            }}
          >
            The spot as {guestName}
            {gameType ? ` · ${gameType}` : ''}
          </div>

          {claim && (
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  padding: '14px 28px',
                  borderRadius: 16,
                  background: 'rgba(184,90,255,0.18)',
                  border: '1px solid rgba(184,90,255,0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 44, fontWeight: 900, color: '#fff', display: 'flex' }}>
                  {elo}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: '#C9BFDB',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    display: 'flex',
                    marginTop: 4,
                  }}
                >
                  ELO
                </span>
              </div>
              <div
                style={{
                  padding: '14px 28px',
                  borderRadius: 16,
                  background: 'rgba(184,90,255,0.18)',
                  border: '1px solid rgba(184,90,255,0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 44, fontWeight: 900, color: '#fff', display: 'flex' }}>
                  {games}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: '#C9BFDB',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    display: 'flex',
                    marginTop: 4,
                  }}
                >
                  Match{games !== 1 ? 'es' : ''}
                </span>
              </div>
            </div>
          )}

          <div
            style={{
              padding: '20px 44px',
              borderRadius: 22,
              backgroundColor: '#B85AFF',
              color: '#ffffff',
              fontSize: 38,
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
