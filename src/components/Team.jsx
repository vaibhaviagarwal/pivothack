import { useRef } from 'react'
import { useScrubReveal, useSectionExit } from '../hooks/useReveal.js'

const team = [
  { id: 1, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 2, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 3, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 4, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 5, name: 'TBD', role: 'TBD', initials: 'TBD' },
]

/** Diamond frame — a rotated double rule, echoing the cave's crystals. */
function DiamondFrame({ person }) {
  return (
    <div data-reveal className="group flex w-36 flex-col items-center text-center sm:w-40">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rotate-45 rounded-[6px] border border-gold/50 bg-[rgba(42,26,58,0.7)] shadow-panel backdrop-blur-md transition-colors duration-300 group-hover:border-gold/85" />
        <div className="absolute inset-[9px] rotate-45 rounded-[4px] border border-gold/25" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-medium text-gold-soft">
          {person.initials}
        </span>
      </div>

      <h3 className="mt-6 font-display text-base font-normal text-cream">{person.name}</h3>
      <p className="micro-label mt-1.5">{person.role}</p>
    </div>
  )
}

export default function Team() {
  const rootRef = useRef(null)
  useScrubReveal(rootRef, '[data-reveal]', { start: 'top 80%', end: 'center 55%', stagger: 0.12 })
  useSectionExit(rootRef)

  return (
    <section
      id="team"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-32"
    >
      <div data-veil className="w-full max-w-6xl">
        <div data-reveal className="mb-16 text-center">
          <h2 className="section-heading">Team</h2>
          <p className="eyebrow">Coming Soon</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12">
          {team.map((person) => (
            <DiamondFrame key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  )
}
