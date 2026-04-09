import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — ELO Rankings',
  description: 'Privacy policy for ELO Rankings. How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="relative w-full px-4 pt-16 pb-12 overflow-hidden">
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

        <div className="relative max-w-3xl mx-auto text-center">
          <a href="/" className="inline-flex items-center gap-3 mb-8 group">
            <img
              src="/logo/TrofeTransparens.png"
              alt="ELO Rankings"
              width={48}
              height={48}
              className="drop-shadow-[0_0_24px_rgba(184,90,255,0.8)]"
            />
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
          </a>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#9B95A8]">
            Last updated: July 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col gap-6">
        <PolicyCard title="What information we collect">
          <p className="mb-3">When you sign in with Google, we receive:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Your email address</li>
            <li>Your name</li>
            <li>Your Google profile ID</li>
          </ul>
          <p className="mb-3">When you use the app, you create:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Game results and ELO ratings</li>
            <li>Profile picture (optional, uploaded manually)</li>
          </ul>
        </PolicyCard>

        <PolicyCard title="How we use your information">
          <p className="mb-3">We use this information only to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Identify your account</li>
            <li>Display your profile in the app</li>
            <li>Track your game statistics</li>
            <li>Calculate ELO ratings</li>
          </ul>
        </PolicyCard>

        <PolicyCard title="Data storage & deletion">
          <ul className="list-disc list-inside space-y-1">
            <li>Your data is stored securely using Supabase</li>
            <li>We never share or sell your data</li>
            <li>You can delete your profile picture at any time</li>
            <li>For account deletion, please contact us (note: game history shared with other users will be retained)</li>
          </ul>
        </PolicyCard>

        <PolicyCard title="Delete your account">
          <p className="mb-3">To delete your ELO Rankings account and all associated data:</p>
          <p className="mb-3">
            Please send an email to{' '}
            <a
              href="mailto:contact.nordicworks@gmail.com"
              className="text-[#B85AFF] hover:underline"
            >
              contact.nordicworks@gmail.com
            </a>
          </p>
          <p className="mb-3">Include:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Your registered email address</li>
            <li>&quot;Delete my account&quot; in the subject line</li>
          </ul>
          <p>We will delete your account within 72 hours and send confirmation.</p>
        </PolicyCard>

        <PolicyCard title="Contact">
          <p>
            For questions or other inquiries:{' '}
            <a
              href="mailto:contact.nordicworks@gmail.com"
              className="text-[#B85AFF] hover:underline"
            >
              contact.nordicworks@gmail.com
            </a>
          </p>
        </PolicyCard>

        <p className="text-sm text-[#9B95A8] text-center mt-4">
          By using ELO Rankings, you agree to this privacy policy.
        </p>
      </section>

      {/* Footer */}
      <footer
        className="w-full mt-auto px-4 py-8"
        style={{ borderTop: '1px solid rgba(184,90,255,0.12)' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between text-sm text-[#9B95A8]">
          <a href="/support" className="hover:text-white transition-colors">
            &larr; Support
          </a>
          <span>&copy; ELO Rankings</span>
        </div>
      </footer>
    </div>
  )
}

function PolicyCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: '#1E1B2E',
        border: '1px solid rgba(184,90,255,0.12)',
      }}
    >
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <div className="text-sm text-[#9B95A8] leading-relaxed">{children}</div>
    </div>
  )
}
