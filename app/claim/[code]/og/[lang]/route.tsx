import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getClaim, formatGameType } from '../../lib'
import { en } from '@/app/i18n/dictionaries/en'
import { nb } from '@/app/i18n/dictionaries/nb'
import { de } from '@/app/i18n/dictionaries/de'
import { ru } from '@/app/i18n/dictionaries/ru'
import { pl } from '@/app/i18n/dictionaries/pl'
import { isSupportedLang } from '@/app/i18n/types'
import type { Dictionary, LangCode } from '@/app/i18n/types'

const dicts: Record<LangCode, Dictionary> = { en, nb, de, ru, pl }

const SIZE = { width: 1200, height: 630 }

// Path-basert språk: /claim/[code]/og/[lang]. Se kommentar i join-versjonen
// for hvorfor vi bruker Route Handler i stedet for opengraph-image.tsx.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string; lang: string }> },
) {
  const { code, lang: rawLang } = await params
  const lang: LangCode = isSupportedLang(rawLang) ? rawLang : 'en'
  const t = dicts[lang]

  const claim = await getClaim(code)
  const guestName = claim?.guest_name ?? 'Player'
  const listName = claim?.list_name ?? 'ELO Rankings'
  const elo = claim?.guest_elo ?? 1000
  const games = claim?.guest_total_games ?? 0
  const gameType = claim ? formatGameType(claim.game_type, t.sports) : ''

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
            {t.claim.youAreInvited}
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
            {t.claim.spotAs} {guestName}
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
                  {t.claim.eloLabel}
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
                  {t.claim.matchesLabel(games)}
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
    { ...SIZE },
  )
}
