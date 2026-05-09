import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getScoreboard, formatGameType } from '../../lib'
import { en } from '@/app/i18n/dictionaries/en'
import { nb } from '@/app/i18n/dictionaries/nb'
import { de } from '@/app/i18n/dictionaries/de'
import { ru } from '@/app/i18n/dictionaries/ru'
import { pl } from '@/app/i18n/dictionaries/pl'
import { ar } from '@/app/i18n/dictionaries/ar'
import { isSupportedLang } from '@/app/i18n/types'
import type { Dictionary, LangCode } from '@/app/i18n/types'

const dicts: Record<LangCode, Dictionary> = { en, nb, de, ru, pl, ar }

const SIZE = { width: 1200, height: 630 }

// Path-basert språk: /join/[code]/og/[lang]. Vi bruker Route Handler her
// fordi Next.js' opengraph-image.tsx-spesialfil ikke videresender
// searchParams til renderen — bildet ble alltid rendret på engelsk.
// Med språk i path-segmentet kommer det inn via params og fungerer pålitelig.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string; lang: string }> },
) {
  const { code, lang: rawLang } = await params
  const lang: LangCode = isSupportedLang(rawLang) ? rawLang : 'en'
  const t = dicts[lang]

  const sb = await getScoreboard(code)
  const name = sb?.name ?? 'ELO Rankings'
  const playerCount = sb?.players.length ?? 0
  const gameType = sb ? formatGameType(sb.game_type, t.sports) : ''

  // Read the trophy logo from the public folder and inline it as base64
  // so Satori can render it reliably (no network fetch at render time).
  const logoBuffer = await readFile(
    join(process.cwd(), 'public', 'logo', 'TrofeTransparens.png'),
  )
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  // For Arabic, Satori needs an explicit font with Arabic glyphs — system
  // sans-serif fallback doesn't include Arabic, which causes the OG image
  // to fail rendering (silent fail in messengers). Cairo handles both Arabic
  // and Latin, so we only need to load it for Arabic locale.
  const arabicFont = lang === 'ar'
    ? await readFile(join(process.cwd(), 'public', 'fonts', 'Cairo-Variable.ttf'))
    : null

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
          fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'sans-serif',
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
            {t.join.youAreInvited}
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
              {t.join.metaLine(gameType, playerCount)}
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
    {
      ...SIZE,
      fonts: arabicFont
        ? [
            {
              name: 'Cairo',
              data: arabicFont,
              weight: 700,
              style: 'normal',
            },
          ]
        : undefined,
    },
  )
}
