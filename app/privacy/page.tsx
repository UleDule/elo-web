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
            Last updated: May 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col gap-6">
        <PolicyCard title="What information we collect">
          <p className="mb-3">When you sign in with Google or Apple, we receive:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Your email address</li>
            <li>Your name (when provided by the sign-in provider)</li>
            <li>A unique provider account ID used to recognize you on return visits</li>
          </ul>
          <p className="mb-3">When you sign up with email and password, we store your email address and a securely hashed password.</p>
          <p className="mb-3">When you use the app, the following may be created or stored:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Profile information: display name, optional country, profile picture (optional, uploaded manually)</li>
            <li>App language preference, derived from your device locale at sign-up</li>
            <li>Scoreboards you create or join, including invited members and guest players</li>
            <li>Match results, ELO ratings, and per-match ELO history</li>
            <li>Doubles (2v2) team results, head-to-head statistics</li>
            <li>Chat messages you send inside a scoreboard</li>
            <li>In-app notifications (invitations, match events)</li>
            <li>Anonymous usage signals used to decide when to prompt for an app rating</li>
          </ul>
        </PolicyCard>

        <PolicyCard title="How we use your information">
          <p className="mb-3">We use this information only to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Identify your account and let you sign back in</li>
            <li>Display your profile and statistics inside the app</li>
            <li>Calculate ELO ratings and synchronize scoreboards in real time across devices</li>
            <li>Deliver invitations and notifications related to your scoreboards</li>
            <li>Improve the product based on aggregate, non-identifying usage patterns</li>
          </ul>
          <p className="mt-3">We do not sell your data, do not run third-party advertising, and do not use your data for profiling outside the app.</p>
        </PolicyCard>

        <PolicyCard title="Third-party services">
          <p className="mb-3">ELO Rankings relies on the following processors to deliver core functionality:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Supabase</strong> &mdash; authentication, database, real-time sync, file storage</li>
            <li><strong>Google Sign-In</strong> and <strong>Apple Sign In</strong> &mdash; optional account providers</li>
            <li><strong>Resend</strong> &mdash; transactional emails (invitations, account-related messages)</li>
            <li><strong>Apple App Store</strong> and <strong>Google Play</strong> &mdash; app distribution and crash reporting</li>
          </ul>
          <p className="mt-3">Each provider processes only the data necessary for its function and is bound by its own privacy terms.</p>
        </PolicyCard>

        <PolicyCard title="Data storage & retention">
          <ul className="list-disc list-inside space-y-1">
            <li>Data is stored on Supabase infrastructure inside the EU (eu-north-1)</li>
            <li>Offline scoreboards (created without signing in) stay on your device only and are never sent to our servers</li>
            <li>You can change or remove your profile picture at any time</li>
            <li>If you delete your account, your profile and personal data are removed, but match results and ELO history shared with other scoreboard members may be retained so their statistics remain consistent</li>
          </ul>
        </PolicyCard>

        <PolicyCard title="Your rights">
          <p className="mb-3">Under GDPR and similar regulations, you have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data (most fields are editable directly in the app)</li>
            <li>Request deletion of your account and personal data</li>
            <li>Receive a copy of your data in a portable format</li>
            <li>Object to or restrict processing</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email{' '}
            <a
              href="mailto:contact.nordicworks@gmail.com"
              className="text-[#B85AFF] hover:underline"
            >
              contact.nordicworks@gmail.com
            </a>
            . We respond within 30 days.
          </p>
        </PolicyCard>

        <PolicyCard title="Delete your account">
          <p className="mb-3">You can delete your ELO Rankings account directly in the app: open your profile, scroll to the bottom, and tap <strong>Delete Account</strong>. Deletion is processed automatically and confirmed on screen.</p>
          <p className="mb-3">If you cannot access the app, you can request deletion by email instead:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Send an email to <a href="mailto:contact.nordicworks@gmail.com" className="text-[#B85AFF] hover:underline">contact.nordicworks@gmail.com</a></li>
            <li>Use the subject &quot;Delete my account&quot;</li>
            <li>Include your registered email address</li>
          </ul>
          <p>Email-based deletion is processed within 72 hours and confirmed by reply.</p>
        </PolicyCard>

        <PolicyCard title="Contact">
          <p>
            For privacy questions or other inquiries:{' '}
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
