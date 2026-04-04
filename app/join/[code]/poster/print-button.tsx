'use client'

import { useEffect } from 'react'

export function PrintButton() {
  useEffect(() => {
    window.print()
  }, [])

  return (
    <button
      onClick={() => window.print()}
      className="print:hidden fixed top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition hover:bg-gray-100"
      aria-label="Print poster"
    >
      <svg
        className="w-6 h-6 text-gray-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    </button>
  )
}
