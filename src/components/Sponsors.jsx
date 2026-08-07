import { useRef } from 'react'
import { useScrubReveal, useSectionExit } from '../hooks/useReveal.js'

const prizes = [
  { id: 1, label: 'TBD', amount: 'TBD', note: 'TBD' },
  { id: 2, label: 'TBD', amount: 'TBD', note: 'TBD' },
  { id: 3, label: 'TBD', amount: 'TBD', note: 'TBD' },
]

const sponsors = [
  { id: 1, name: 'TBD' },
  { id: 2, name: 'TBD' },
  { id: 3, name: 'TBD' },
  { id: 4, name: 'TBD' },
]

export default function Sponsors() {
  const rootRef = useRef(null)
  useScrubReveal(rootRef, '[data-reveal]', { start: 'top 82%', end: 'center 50%', stagger: 0.14 })
  useSectionExit(rootRef)

  return (
    <section
      id="sponsors"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-32"
    >
      <div data-veil className="w-full max-w-5xl">
        <div data-reveal className="mb-14 text-center">
          <h2 className="section-heading">Sponsors &amp; Prizes</h2>
          <p className="eyebrow">Coming Soon</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {prizes.map((prize) => (
            <div key={prize.id} data-reveal className="panel-card panel-card-hover p-7 text-center">
              <p className="micro-label">{prize.label}</p>
              <p className="mt-3 font-display text-4xl font-normal text-cream">{prize.amount}</p>
              <p className="mt-3 font-sans text-xs font-light text-cream/50">{prize.note}</p>
            </div>
          ))}
        </div>

        <p data-reveal className="micro-label mt-16 text-center">
          Backed By
        </p>

        <div
          data-reveal
          className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-[rgba(26,15,40,0.45)] backdrop-blur-md sm:grid-cols-4"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex h-20 items-center justify-center border-b border-r border-white/[0.07] px-3 text-center font-sans text-[11px] font-medium uppercase tracking-widest2 text-cream/70 transition-colors duration-300 hover:bg-white/5 hover:text-gold-soft sm:h-24"
            >
              {sponsor.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
