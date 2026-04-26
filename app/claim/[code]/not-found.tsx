const LOGO_URL =
  'https://hpbtgieebhhowxwbxshd.supabase.co/storage/v1/object/public/ui/TrofeTransparens.png'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_URL}
        alt="ELO Rankings"
        width={64}
        height={64}
        className="mb-5 opacity-40"
      />
      <h1 className="text-xl font-bold text-white mb-2">Invitation not available</h1>
      <p className="text-[#9B95A8] text-sm text-center max-w-xs">
        This invitation may have expired, been revoked, or already been used.
        Ask the scoreboard owner for a new invite link.
      </p>
    </div>
  )
}
