import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { getClaim, formatGameType } from './lib'
import ClaimButton from './ClaimButton'
import { getDictionary } from '@/app/i18n'
import LanguageSwitcher from '@/app/i18n/LanguageSwitcher'

// --- metadata ---

type Props = {
  params: Promise<{ code: string }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { code } = await params
  const { lang: searchLang } = await searchParams
  const claim = await getClaim(code)
  if (!claim) return { title: 'ELO Rankings' }

  const { lang, t } = await getDictionary(searchLang)
  const title = `${t.claim.takeSpot}: ${claim.guest_name} (${claim.list_name})`
  const description = `${claim.guest_elo} ELO · ${claim.guest_total_games} ${t.claim.matchesLabel(claim.guest_total_games)}`
  const url = `https://elorankings.com/claim/${code}?lang=${lang}`
  // OG-bildet bruker språk i path (ikke query) fordi Next.js'
  // opengraph-image.tsx-spesialfil ikke videresender searchParams til
  // renderen — bildet ble alltid rendret på engelsk. Med språk i path-
  // segmentet kommer det inn via params og fungerer pålitelig.
  const ogImageUrl = `https://elorankings.com/claim/${code}/og/${lang}`

  return {
    metadataBase: new URL('https://elorankings.com'),
    title,
    description,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'ELO Rankings',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

// --- constants ---

const LOGO_URL =
  'https://hpbtgieebhhowxwbxshd.supabase.co/storage/v1/object/public/ui/TrofeTransparens.png'

// --- page ---

export default async function ClaimPage({ params, searchParams }: Props) {
  const { code } = await params
  const { lang: searchLang } = await searchParams
  const claim = await getClaim(code)
  if (!claim) notFound()

  const { lang, t } = await getDictionary(searchLang)
  const claimUrl = `https://elorankings.com/claim/${code}`

  const qrSvg = await QRCode.toString(claimUrl, {
    type: 'svg',
    width: 200,
    margin: 0,
    color: { dark: '#D4AAFF', light: '#00000000' },
  })

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <div
        className="w-full text-center px-4 pt-10 pb-10 relative"
        style={{
          background:
            'linear-gradient(135deg, #181622 0%, #2D1B69 50%, #181622 100%)',
          borderBottom: '1px solid rgba(184,90,255,0.15)',
        }}
      >
        <div className="absolute top-4 right-4">
          <LanguageSwitcher current={lang} />
        </div>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div
            className="rounded-2xl p-1.5"
            style={{ background: 'rgba(184,90,255,0.08)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_URL}
              alt={t.appName}
              width={48}
              height={48}
              className="drop-shadow-[0_0_24px_rgba(184,90,255,0.8)]"
            />
          </div>
          <span
            className="text-2xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #B85AFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.appName}
          </span>
        </div>

        <div
          className="inline-block rounded-full px-4 py-1 mb-4 text-[11px] font-bold tracking-[2px] uppercase"
          style={{
            background: 'rgba(184,90,255,0.18)',
            color: '#E5C8FF',
            border: '1px solid rgba(184,90,255,0.3)',
          }}
        >
          {t.claim.youAreInvited}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {claim.list_name}
        </h1>
        <p className="text-[#9B95A8] text-sm">
          {t.claim.spotAs}{' '}
          <span className="text-white font-semibold">{claim.guest_name}</span>{' '}
          &middot; {formatGameType(claim.game_type, t.sports)}
        </p>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl px-4 py-8 flex flex-col gap-6">
        {/* Stats card */}
        <div
          className="rounded-2xl p-6 flex items-center justify-around gap-4"
          style={{
            background: '#1E1B2E',
            border: '1px solid rgba(184,90,255,0.12)',
          }}
        >
          <Stat label={t.claim.eloLabel} value={claim.guest_elo.toString()} />
          <div
            className="h-10 w-px"
            style={{ background: 'rgba(184,90,255,0.18)' }}
          />
          <Stat
            label={t.claim.matchesPlayedLabel(claim.guest_total_games)}
            value={claim.guest_total_games.toString()}
          />
        </div>

        {/* Explainer — ingen avatar her, fordi gjestespillere alltid mangler
            bilde og initial-avataren bare ville dyttet join-knappen lenger
            ned. Navnet stiges i visuell vekt for å fortsatt være tydelig. */}
        <div
          className="rounded-2xl p-5 text-center"
          style={{
            background: '#1E1B2E',
            border: '1px solid rgba(184,90,255,0.12)',
          }}
        >
          <p className="text-[#C9BFDB] text-base mb-2">
            {t.claim.takeSpot}:{' '}
            <strong className="text-white">{claim.guest_name}</strong>
          </p>
          <p className="text-[12px] text-[#9B95A8] leading-relaxed max-w-md mx-auto">
            {t.claim.takeSpotExplainer}
          </p>
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden">
          <ClaimButton code={code} label={t.claim.claimButton} />
          <p className="text-[11px] text-[#6B6577] text-center mt-3">
            {t.dontHaveApp}
          </p>
        </div>

        {/* Desktop split: QR + download */}
        <div className="hidden lg:flex gap-5">
          <div
            className="flex-1 rounded-2xl p-6 flex flex-col items-center text-center"
            style={{
              background: '#1E1B2E',
              border: '1px solid rgba(184,90,255,0.12)',
            }}
          >
            <p className="text-white font-semibold text-sm mb-5">
              {t.claim.scanToClaim}
            </p>
            <div
              className="rounded-xl p-5"
              style={{
                background: 'rgba(184,90,255,0.06)',
                border: '1px solid rgba(184,90,255,0.15)',
              }}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          </div>

          <div
            className="flex-1 rounded-2xl p-5"
            style={{
              background: '#1E1B2E',
              border: '1px solid rgba(184,90,255,0.12)',
            }}
          >
            <p className="text-[#9B95A8] text-sm text-center mb-4">
              {t.claim.downloadAppToClaim}{' '}
              <strong className="text-white">{claim.list_name}</strong>
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/app/elo-rankings/id6749603706"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-sm font-semibold text-white transition-colors"
                style={{
                  background: 'rgba(184,90,255,0.15)',
                  border: '1px solid rgba(184,90,255,0.3)',
                }}
              >
                <AppleIcon />
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.nordicworks.elorankings"
                className="flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-sm font-semibold text-white transition-colors"
                style={{
                  background: 'rgba(184,90,255,0.15)',
                  border: '1px solid rgba(184,90,255,0.3)',
                }}
              >
                <PlayIcon />
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- sub-components ---

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-extrabold tabular-nums leading-none"
        style={{
          fontSize: 36,
          background:
            'linear-gradient(to bottom, #E9D5FF 0%, #B85AFF 33%, #6D28D9 66%, #B85AFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {value}
      </span>
      <span
        className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#9B95A8] mt-2"
      >
        {label}
      </span>
    </div>
  )
}


function AppleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.61 1.814L13.793 12 3.61 22.186a1.5 1.5 0 0 1-.11-.57V2.384c0-.2.04-.39.11-.57zm1.06-.87L15.855 7.6l-2.8 2.8L5.07.95a.5.5 0 0 1-.4.005zM16.844 8.32l3.27 1.85c.77.44.77 1.22 0 1.66l-3.27 1.85-3.05-3.05 3.05-3.31zM4.67 23.05l7.985-7.45 2.8 2.8L4.27 25.056a.5.5 0 0 0 .4-.005z" />
    </svg>
  )
}
