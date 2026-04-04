import Image from 'next/image'
import QRCode from 'qrcode'

// --- page ---

export default async function Home() {
  const qrSvg = await QRCode.toString('https://elorankings.com', {
    type: 'svg',
    width: 160,
    margin: 0,
    color: { dark: '#D4AAFF', light: '#00000000' },
  })

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative w-full px-4 pt-16 pb-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #181622 0%, #2D1B69 50%, #181622 100%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(184,90,255,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'rgba(184,90,255,0.15)' }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div
              className="rounded-2xl p-2"
              style={{ background: 'rgba(184,90,255,0.08)' }}
            >
              <img
                src="/logo/TrofeTransparens.png"
                alt="ELO Rankings"
                width={72}
                height={72}
                className="drop-shadow-[0_0_32px_rgba(184,90,255,0.8)]"
              />
            </div>
            <span
              className="text-4xl font-extrabold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #B85AFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ELO Rankings
            </span>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight text-center">
            Settle the score
          </h1>
          <p className="text-lg sm:text-xl text-[#9B95A8] mb-12 text-center">
            Fair ELO-based rankings for any game your group plays.
          </p>

          {/* CTA: Desktop = QR + buttons side by side, Mobile = buttons only */}
          <div className="flex justify-center">
            {/* Desktop layout */}
            <div className="hidden sm:flex items-center gap-10">
              <div className="flex flex-col items-center">
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: 'rgba(184,90,255,0.06)',
                    border: '1px solid rgba(184,90,255,0.15)',
                  }}
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <p className="text-xs text-[#9B95A8] mt-3">
                  Scan to download
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://apps.apple.com/app/elo-rankings/id6749603706"
                  className="flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-8 text-base font-semibold text-white transition hover:brightness-125"
                  style={{
                    background: 'rgba(184,90,255,0.15)',
                    border: '1px solid rgba(184,90,255,0.3)',
                  }}
                >
                  <AppleIcon /> App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.nordicworks.elorankings"
                  className="flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-8 text-base font-semibold text-white transition hover:brightness-125"
                  style={{
                    background: 'rgba(184,90,255,0.15)',
                    border: '1px solid rgba(184,90,255,0.3)',
                  }}
                >
                  <PlayIcon /> Google Play
                </a>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="flex sm:hidden gap-4">
              <a
                href="https://apps.apple.com/app/elo-rankings/id6749603706"
                className="flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-8 text-base font-semibold text-white transition hover:brightness-125"
                style={{ background: '#B85AFF' }}
              >
                <AppleIcon /> App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.nordicworks.elorankings"
                className="flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-8 text-base font-semibold text-white transition hover:brightness-125"
                style={{ background: '#B85AFF' }}
              >
                <PlayIcon /> Google Play
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          Everything you need to settle the score
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<ChartIcon />}
            title="Fair Rankings"
            description="The ELO system adapts to opponent strength. Beat a top player, climb faster."
          />
          <FeatureCard
            icon={<GridIcon />}
            title="Any Game, Any Group"
            description="Create separate scoreboards for every game. Office ping-pong, family chess, dorm FIFA."
          />
          <FeatureCard
            icon={<ShareIcon />}
            title="Invite in Seconds"
            description="Share a link or print a QR poster. Anyone can join and start competing."
          />
        </div>
      </section>

      {/* Screenshots */}
      <section className="w-full max-w-4xl mx-auto px-4 pb-24">
        <div className="flex justify-center items-end gap-6 sm:gap-12">
          <div
            className="rounded-[2rem] overflow-hidden ring-1 ring-white/10 transition-transform hover:scale-[1.02]"
            style={{
              boxShadow:
                '0 25px 60px -12px rgba(184,90,255,0.2), 0 0 40px -8px rgba(184,90,255,0.1)',
              transform: 'rotate(-3deg)',
            }}
          >
            <Image
              src="/screenshots/1.png"
              alt="Live leaderboard showing player rankings and ELO scores"
              width={220}
              height={476}
              className="w-full h-auto"
            />
          </div>
          <div
            className="rounded-[2rem] overflow-hidden ring-1 ring-white/10 transition-transform hover:scale-[1.02]"
            style={{
              boxShadow:
                '0 25px 60px -12px rgba(184,90,255,0.2), 0 0 40px -8px rgba(184,90,255,0.1)',
              transform: 'rotate(3deg)',
            }}
          >
            <Image
              src="/screenshots/3.png"
              alt="Register a match between two players"
              width={220}
              height={476}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="w-full mt-auto px-4 py-8"
        style={{ borderTop: '1px solid rgba(184,90,255,0.12)' }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-center text-sm text-[#9B95A8]">
          <span>&copy; ELO Rankings</span>
        </div>
      </footer>
    </div>
  )
}

// --- sub-components ---

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div
      className="group rounded-2xl p-6 text-center transition-all hover:scale-[1.02]"
      style={{
        background: '#1E1B2E',
        border: '1px solid rgba(184,90,255,0.12)',
      }}
    >
      <div
        className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-colors group-hover:shadow-[0_0_20px_rgba(184,90,255,0.3)]"
        style={{ background: 'rgba(184,90,255,0.1)', color: '#B85AFF' }}
      >
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#9B95A8]">{description}</p>
    </div>
  )
}

// --- icons ---

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.61 1.814L13.793 12 3.61 22.186a1.5 1.5 0 0 1-.11-.57V2.384c0-.2.04-.39.11-.57zm1.06-.87L15.855 7.6l-2.8 2.8L5.07.95a.5.5 0 0 1-.4.005zM16.844 8.32l3.27 1.85c.77.44.77 1.22 0 1.66l-3.27 1.85-3.05-3.05 3.05-3.31zM4.67 23.05l7.985-7.45 2.8 2.8L4.27 25.056a.5.5 0 0 0 .4-.005z" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-3 3" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}
