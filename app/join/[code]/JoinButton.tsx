'use client'

const APP_STORE_URL =
  'https://apps.apple.com/app/elo-rankings/id6749603706'
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nordicworks.elorankings'

export default function JoinButton({ code }: { code: string }) {
  const handleClick = () => {
    const ua = navigator.userAgent
    const isAndroid = /Android/i.test(ua)
    const isIOS = /iPhone|iPad|iPod/i.test(ua)

    if (isAndroid) {
      const fallback = encodeURIComponent(PLAY_STORE_URL)
      const intentUrl =
        `intent://elorankings.com/join/${code}` +
        `#Intent;scheme=https;package=com.nordicworks.elorankings;` +
        `S.browser_fallback_url=${fallback};end`
      window.location.href = intentUrl
      return
    }

    if (isIOS) {
      window.location.href = `elorankings://join/${code}`
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = APP_STORE_URL
        }
      }, 1500)
      return
    }

    window.location.href = '/get'
  }

  return (
    <button
      onClick={handleClick}
      className="block w-full text-center rounded-xl py-4 text-base font-bold text-white transition-all hover:brightness-125 active:scale-[0.98]"
      style={{
        background: 'linear-gradient(135deg, #B85AFF 0%, #6E4BD7 100%)',
        boxShadow: '0 0 24px rgba(184,90,255,0.45)',
      }}
    >
      Join scoreboard
    </button>
  )
}
