'use client'

import { useEffect } from 'react'

/**
 * On mobile, silently try to open the app via custom URL scheme.
 * - If the app is installed: it comes to the foreground (no visible effect
 *   if it's already open from a Universal Link).
 * - If not installed: nothing happens — the user sees the web page normally.
 * No timers, no fallback, no App Store redirect.
 */
export default function AppRedirect({ code }: { code: string }) {
  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isIOS) {
      window.location.href = `elorankings://join/${code}`
    }
  }, [code])

  return null
}
