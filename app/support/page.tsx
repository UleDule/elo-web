import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support — ELO Rankings',
  description: 'Get help with ELO Rankings. FAQ, contact information, and privacy policy.',
}

export default function SupportPage() {
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
            Support
          </h1>
          <p className="text-lg text-[#9B95A8]">
            Find answers to common questions or reach out to us directly.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          <FaqCard
            question="How does the ELO system work?"
            answer="The ELO system calculates fair ratings based on match results. When a lower-rated player beats a higher-rated player, they gain more points. This means rankings reflect true skill, not just how many games you've played."
          />
          <FaqCard
            question="Can I have multiple scoreboards?"
            answer="Yes! You can create unlimited offline scoreboards and join multiple online scoreboards. Perfect for tracking different games or groups separately."
          />
          <FaqCard
            question="Is my data secure?"
            answer="Your data is stored securely using Supabase with row-level security. We never share or sell your data. Offline scoreboards are stored locally on your device only."
          />
          <FaqCard
            question="How do I delete my account?"
            answer={
              <>
                Go to your profile in the app and tap <strong>Delete Account</strong>. This will permanently remove your account and all associated data. Alternatively, email us at{' '}
                <a
                  href="mailto:contact.nordicworks@gmail.com"
                  className="text-[#B85AFF] hover:underline"
                >
                  contact.nordicworks@gmail.com
                </a>{' '}
                with the subject &quot;Delete my account&quot; and include your registered email.
              </>
            }
          />
          <FaqCard
            question="Does the app support team sports?"
            answer="Currently, ELO Rankings supports 1v1 competitions only. Team support may be added in future updates."
          />
          <FaqCard
            question="The app isn't working properly. What should I do?"
            answer={
              <>
                Try closing and reopening the app, or reinstalling it. If the issue persists, email us at{' '}
                <a
                  href="mailto:contact.nordicworks@gmail.com"
                  className="text-[#B85AFF] hover:underline"
                >
                  contact.nordicworks@gmail.com
                </a>{' '}
                with a description of the issue, your device model, and OS version.
              </>
            }
          />
        </div>
      </section>

      {/* Contact */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: '#1E1B2E',
            border: '1px solid rgba(184,90,255,0.12)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(184,90,255,0.1)', color: '#B85AFF' }}
          >
            <MailIcon />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Contact Us</h2>
          <p className="text-[#9B95A8] mb-4">
            Can&apos;t find what you&apos;re looking for? Reach out directly.
          </p>
          <a
            href="mailto:contact.nordicworks@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold text-white transition hover:brightness-125"
            style={{
              background: 'rgba(184,90,255,0.15)',
              border: '1px solid rgba(184,90,255,0.3)',
            }}
          >
            contact.nordicworks@gmail.com
          </a>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: '#1E1B2E',
            border: '1px solid rgba(184,90,255,0.12)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(184,90,255,0.1)', color: '#B85AFF' }}
          >
            <ShieldIcon />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Privacy Policy</h2>
          <p className="text-[#9B95A8] mb-4">
            Read about how we handle your data.
          </p>
          <a
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold text-white transition hover:brightness-125"
            style={{
              background: 'rgba(184,90,255,0.15)',
              border: '1px solid rgba(184,90,255,0.3)',
            }}
          >
            View Privacy Policy
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="w-full mt-auto px-4 py-8"
        style={{ borderTop: '1px solid rgba(184,90,255,0.12)' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between text-sm text-[#9B95A8]">
          <a href="/" className="hover:text-white transition-colors">
            &larr; Back to home
          </a>
          <span>&copy; ELO Rankings</span>
        </div>
      </footer>
    </div>
  )
}

function FaqCard({
  question,
  answer,
}: {
  question: string
  answer: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: '#1E1B2E',
        border: '1px solid rgba(184,90,255,0.12)',
      }}
    >
      <h3 className="text-white font-semibold mb-2">{question}</h3>
      <p className="text-sm text-[#9B95A8] leading-relaxed">{answer}</p>
    </div>
  )
}

function MailIcon() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  )
}

function ShieldIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
