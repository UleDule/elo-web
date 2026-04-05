import { NextRequest, NextResponse } from 'next/server'

const APP_STORE_URL =
  'https://apps.apple.com/app/elo-rankings/id6749603706'
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nordicworks.elorankings'

export function GET(req: NextRequest) {
  const ua = req.headers.get('user-agent') ?? ''
  const isIOS = /iPhone|iPad|iPod/i.test(ua)
  const isAndroid = /Android/i.test(ua)

  if (isIOS) {
    return NextResponse.redirect(APP_STORE_URL, 302)
  }
  if (isAndroid) {
    return NextResponse.redirect(PLAY_STORE_URL, 302)
  }

  // Desktop / unknown — send them back to the landing page
  return NextResponse.redirect(new URL('/', req.url), 302)
}
