import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { getScoreboard, formatGameType } from '../lib'
import { PrintButton } from './print-button'
import { getDictionary } from '@/app/i18n'

// --- metadata ---

type Props = {
  params: Promise<{ code: string }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const sb = await getScoreboard(code)
  if (!sb) return { title: 'ELO Rankings' }
  return {
    title: `${sb.name} – Print Poster – ELO Rankings`,
  }
}

// --- page ---

export default async function PosterPage({ params, searchParams }: Props) {
  const { code } = await params
  const { lang: searchLang } = await searchParams
  const sb = await getScoreboard(code)
  if (!sb) notFound()

  const { lang, t } = await getDictionary(searchLang)
  // Bruker samme språk for QR-targetet, så mottakeren lander på poster-eierens
  // språk når de scanner.
  const joinUrl = `https://elorankings.com/join/${code}?lang=${lang}`

  const qrSvg = await QRCode.toString(joinUrl, {
    type: 'svg',
    width: 400,
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  })

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white print:p-0"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <PrintButton />

      <div className="flex flex-col items-center text-center text-black">
        {/* Logo + app name */}
        <div className="flex items-center gap-3 mb-12">
          <img
            src="/logo/TrofeTransparens.png"
            alt=""
            width={44}
            height={44}
            className="grayscale"
          />
          <span className="text-2xl font-extrabold tracking-tight">
            ELO Rankings
          </span>
        </div>

        {/* Scoreboard name */}
        <h1 className="text-4xl font-extrabold mb-1">
          {sb.name}
        </h1>
        <p className="text-lg text-gray-400 mb-14">
          {formatGameType(sb.game_type, t.sports)}
        </p>

        {/* QR code — fixed size, centered */}
        <div className="w-[280px] h-[280px] mx-auto mb-14">
          <div
            className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
        </div>

        {/* Call to action */}
        <p className="text-2xl font-bold mb-1">
          {t.scanToJoin}
        </p>
        <p className="text-base text-gray-400">
          {t.join.posterCta}
        </p>
      </div>
    </div>
  )
}
