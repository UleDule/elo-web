import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { getScoreboard, getProfile, formatGameType } from './lib'
import JoinButton from './JoinButton'

// --- metadata ---

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const sb = await getScoreboard(code)
  if (!sb) return { title: 'ELO Rankings' }

  const title = `Join ${sb.name} on ELO Rankings`
  const playerCount = sb.players.length
  const description =
    `You've been invited to ${sb.name} — ${playerCount} ` +
    `player${playerCount !== 1 ? 's' : ''} competing in ` +
    `${formatGameType(sb.game_type)}. Tap to join!`
  const url = `https://elorankings.com/join/${code}`

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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

// --- constants ---

const LOGO_URL =
  'https://hpbtgieebhhowxwbxshd.supabase.co/storage/v1/object/public/ui/TrofeTransparens.png'

const ACCENT_COLORS = [
  '#B85AFF', '#60A5FA', '#4ADE80', '#FB923C',
  '#F87171', '#FACC15', '#22D3EE', '#A78BFA',
]

function pickColor(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return ACCENT_COLORS[Math.abs(h) % ACCENT_COLORS.length]
}

// --- page ---

export default async function JoinPage({ params }: Props) {
  const { code } = await params
  const sb = await getScoreboard(code)
  if (!sb) notFound()

  const joinUrl = `https://elorankings.com/join/${code}`

  const qrSvg = await QRCode.toString(joinUrl, {
    type: 'svg',
    width: 200,
    margin: 0,
    color: { dark: '#D4AAFF', light: '#00000000' },
  })

  return (
    <div className="min-h-screen flex flex-col items-center">

      {/* Hero */}
      <div
        className="w-full text-center px-4 pt-10 pb-10"
        style={{
          background: 'linear-gradient(135deg, #181622 0%, #2D1B69 50%, #181622 100%)',
          borderBottom: '1px solid rgba(184,90,255,0.15)',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <div
            className="rounded-2xl p-1.5"
            style={{ background: 'rgba(184,90,255,0.08)' }}
          >
            <img
              src={LOGO_URL}
              alt="ELO Rankings"
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
            ELO Rankings
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{sb.name}</h1>
        <p className="text-[#9B95A8] text-sm">
          {formatGameType(sb.game_type)} &middot; {sb.players.length} player{sb.players.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl px-4 py-8 flex flex-col lg:flex-row gap-6">

        {/* Mobile CTA — shown above leaderboard on small screens */}
        <div className="lg:hidden">
          <MobileCta name={sb.name} code={code} />
        </div>

        {/* Leaderboard */}
        <div className="flex-1 min-w-0">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#1E1B2E', border: '1px solid rgba(184,90,255,0.12)' }}
          >
            {/* Rows */}
            <div className="p-2 flex flex-col gap-1.5">
              {sb.players.map((player, i) => {
                const profile = getProfile(player)
                const name = profile?.display_name ?? player.guest_name ?? 'Guest'
                const avatar = profile?.avatar_url
                return (
                  <div
                    key={player.id}
                    className="flex items-center px-4 py-2.5 rounded-xl gap-3 transition-colors hover:brightness-125"
                    style={{ background: '#252237' }}
                  >
                    {/* Rank badge */}
                    <RankBadge rank={i + 1} />

                    {/* Name */}
                    <span className="flex-1 text-white font-medium text-sm truncate">{name}</span>

                    {/* ELO score */}
                    <span className="text-sm font-bold text-white tabular-nums">{player.elo}</span>

                    {/* Avatar — right side, square with rounded corners */}
                    <AvatarSquare name={name} url={avatar} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-8 flex flex-col gap-5">
            {/* QR card — primary on desktop */}
            <div
              className="rounded-2xl p-6 flex flex-col items-center text-center"
              style={{ background: '#1E1B2E', border: '1px solid rgba(184,90,255,0.12)' }}
            >
              <p className="text-white font-semibold text-sm mb-5">Scan to join</p>
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(184,90,255,0.06)', border: '1px solid rgba(184,90,255,0.15)' }}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <a
                href={`/join/${code}/poster`}
                className="mt-4 w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:brightness-125 ring-1 ring-[#D4AAFF]/30"
                style={{ background: 'rgba(184,90,255,0.15)' }}
                title="Print QR poster"
              >
                <PrinterIcon />
              </a>
            </div>

            {/* Download card */}
            <DesktopDownloadCard name={sb.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- sub-components ---

function RankBadge({ rank }: { rank: number }) {
  let bg: string, color: string
  if (rank === 1) {
    bg = 'rgba(250,204,21,0.2)'; color = '#FACC15'
  } else if (rank === 2) {
    bg = 'rgba(156,163,175,0.2)'; color = '#9CA3AF'
  } else if (rank === 3) {
    bg = 'rgba(251,146,60,0.2)'; color = '#FB923C'
  } else {
    bg = 'rgba(184,90,255,0.1)'; color = '#B85AFF'
  }
  return (
    <span
      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: bg, color }}
    >
      {rank}
    </span>
  )
}

function AvatarSquare({ name, url }: { name: string; url?: string | null }) {
  const size = 40
  if (url) {
    return (
      <img
        src={url}
        alt=""
        width={size}
        height={size}
        className="rounded-xl object-cover shrink-0 ring-1 ring-white/10"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span
      className="rounded-xl flex items-center justify-center text-white font-semibold shrink-0 ring-1 ring-white/10"
      style={{ width: size, height: size, fontSize: 15, background: pickColor(name) }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

function MobileCta({ name, code }: { name: string; code: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: '#1E1B2E', border: '1px solid rgba(184,90,255,0.12)' }}
    >
      <p className="text-[#9B95A8] text-sm text-center mb-4">
        Join <strong className="text-white">{name}</strong>
      </p>
      <JoinButton code={code} />
      <p className="text-[11px] text-[#6B6577] text-center mt-3">
        Don&apos;t have the app? We&apos;ll take you to the store.
      </p>
    </div>
  )
}

function DesktopDownloadCard({ name }: { name: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: '#1E1B2E', border: '1px solid rgba(184,90,255,0.12)' }}
    >
      <p className="text-[#9B95A8] text-sm text-center mb-4">
        Download the app to join <strong className="text-white">{name}</strong>
      </p>
      <div className="flex gap-3">
        <a
          href="https://apps.apple.com/app/elo-rankings/id6749603706"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-sm font-semibold text-white transition-colors"
          style={{ background: 'rgba(184,90,255,0.15)', border: '1px solid rgba(184,90,255,0.3)' }}
        >
          <AppleIcon />
          App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.nordicworks.elorankings"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-sm font-semibold text-white transition-colors"
          style={{ background: 'rgba(184,90,255,0.15)', border: '1px solid rgba(184,90,255,0.3)' }}
        >
          <PlayIcon />
          Google Play
        </a>
      </div>
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

function PrinterIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#D4AAFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}
