import Image from 'next/image'
import QRCode from 'qrcode'

// --- page ---

export default async function Home() {
  const qrSvg = await QRCode.toString('https://elorankings.com/get', {
    type: 'svg',
    width: 160,
    margin: 0,
    color: { dark: '#D4AAFF', light: '#00000000' },
  })

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, #2D1B69 0%, transparent 70%), linear-gradient(180deg, #181622 0%, #1A1428 100%)',
      }}
    >
      {/* Hero */}
      <section className="relative w-full px-4 pt-16 pb-20 overflow-hidden">
        {/* Purple accent glow — scoped to hero */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(184,90,255,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'rgba(184,90,255,0.15)' }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Hero banner — promo art replaces logo + wordmark + tagline */}
          <h1 className="sr-only">ELO Rankings — Settle the score</h1>
          <div className="flex justify-center mb-8">
            <Image
              src="/promoart/hero.png"
              alt="ELO Rankings — Settle the score"
              width={1024}
              height={500}
              priority
              className="w-full max-w-2xl h-auto rounded-2xl"
              style={{
                boxShadow:
                  '0 25px 60px -12px rgba(184,90,255,0.25), 0 0 40px -8px rgba(184,90,255,0.15)',
              }}
            />
          </div>
          <p className="text-lg sm:text-xl text-[#9B95A8] mb-12 text-center max-w-xl mx-auto">
            Ping pong at the office. Chess with friends. FIFA on the couch. Or whatever your group plays.
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
            <div className="flex sm:hidden gap-3">
              <a
                href="https://apps.apple.com/app/elo-rankings/id6749603706"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-5 text-sm font-semibold text-white whitespace-nowrap transition hover:brightness-125"
                style={{
                  background: 'rgba(184,90,255,0.15)',
                  border: '1px solid rgba(184,90,255,0.3)',
                }}
              >
                <AppleIcon /> App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.nordicworks.elorankings"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-5 text-sm font-semibold text-white whitespace-nowrap transition hover:brightness-125"
                style={{
                  background: 'rgba(184,90,255,0.15)',
                  border: '1px solid rgba(184,90,255,0.3)',
                }}
              >
                <PlayIcon /> Google Play
              </a>
            </div>
          </div>

          {/* Proof row */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#9B95A8]">
            <span>Free, no ads</span>
            <span className="opacity-30">·</span>
            <span>17 languages</span>
            <span className="opacity-30">·</span>
            <span>iOS &amp; Android</span>
            <span className="opacity-30">·</span>
            <span>Works offline</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative w-full max-w-4xl mx-auto px-4 py-20">
        {/* Subtle accent glow for continuity */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(184,90,255,0.06) 0%, transparent 70%)',
          }}
        />
        <h2 className="relative text-2xl font-bold text-white text-center mb-12">
          Everything you need to settle the score
        </h2>
        <div className="relative grid md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<TrophyIcon />}
            title="Fair Rankings"
            description="The ELO system adapts to opponent strength. Beat a top player, climb faster."
          />
          <FeatureCard
            icon={<ScoreboardsIcon />}
            title="Any Game, Any Group"
            description="Create separate scoreboards for every game. Office ping-pong, family chess, dorm FIFA."
          />
          <FeatureCard
            icon={<QrIcon />}
            title="Invite in Seconds"
            description="Share a link or print a QR poster. Anyone can join and start competing."
          />
        </div>
      </section>

      {/* Screenshots */}
      <section className="w-full max-w-4xl mx-auto px-4 pb-24">
        <div className="flex justify-center items-end gap-2 sm:gap-6">
          {/* Left — leaderboard */}
          <div
            className="rounded-[2rem] overflow-hidden ring-1 ring-white/10 transition-transform hover:scale-[1.04] w-[120px] sm:w-[180px] -rotate-6 translate-y-4"
            style={{
              boxShadow:
                '0 25px 60px -12px rgba(184,90,255,0.2), 0 0 40px -8px rgba(184,90,255,0.1)',
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
          {/* Center — match registration (focal point) */}
          <div
            className="rounded-[2rem] overflow-hidden ring-1 ring-white/10 transition-transform hover:scale-[1.04] w-[150px] sm:w-[220px] relative z-10"
            style={{
              boxShadow:
                '0 30px 70px -12px rgba(184,90,255,0.3), 0 0 50px -8px rgba(184,90,255,0.18)',
            }}
          >
            <Image
              src="/screenshots/2.png"
              alt="Register a singles or doubles match in two taps"
              width={220}
              height={476}
              className="w-full h-auto"
            />
          </div>
          {/* Right — scoreboard overview */}
          <div
            className="rounded-[2rem] overflow-hidden ring-1 ring-white/10 transition-transform hover:scale-[1.04] w-[120px] sm:w-[180px] rotate-6 translate-y-4"
            style={{
              boxShadow:
                '0 25px 60px -12px rgba(184,90,255,0.2), 0 0 40px -8px rgba(184,90,255,0.1)',
            }}
          >
            <Image
              src="/screenshots/3.png"
              alt="Overview of your scoreboards with top-three podiums"
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
        className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all group-hover:shadow-[0_0_28px_rgba(184,90,255,0.45)] group-hover:scale-110"
        style={{
          background:
            'linear-gradient(135deg, rgba(184,90,255,0.18) 0%, rgba(255,90,184,0.12) 100%)',
          border: '1px solid rgba(184,90,255,0.25)',
          color: '#D4AAFF',
        }}
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

function TrophyIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v2c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-2.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 13.63 21 11.55 21 9V7c0-1.1-.9-2-2-2zM5 9V7h2v3.82C5.84 10.4 5 9.3 5 9zm14 0c0 .3-.84 1.4-2 1.82V7h2v2z" />
    </svg>
  )
}

function ScoreboardsIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="1.8" opacity="0.55" />
      <rect x="3" y="13" width="8" height="8" rx="1.8" opacity="0.55" />
      <rect x="13" y="13" width="8" height="8" rx="1.8" />
    </svg>
  )
}

function QrIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm-2-2h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v4h-2v-4z" />
    </svg>
  )
}
