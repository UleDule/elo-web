export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-6">
          ELO Rankings
        </p>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Invitasjonen er ikke gyldig</h1>
        <p className="text-zinc-500 text-sm">
          Lenken kan være utløpt eller feil. Be om en ny invitasjon.
        </p>
      </div>
    </div>
  )
}
