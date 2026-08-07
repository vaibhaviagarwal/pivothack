import { useRef } from 'react'
import { usePinnedBeats, useSectionExit } from '../hooks/useReveal.js'

const judges = [
  { id: 1, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 2, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 3, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 4, name: 'TBD', role: 'TBD', initials: 'TBD' },
  { id: 5, name: 'TBD', role: 'TBD', initials: 'TBD' },
]

function CornerPip({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1.5 w-1.5 rotate-45 bg-gold/70 ${className}`}
    />
  )
}

/** Gold vintage portrait frame — double rule, arched plate, corner pips. */
function VintageFrame({ judge }) {
  return (
    <div
      data-beat
      className="group relative rounded-sm border border-gold/45 bg-[rgba(42,26,58,0.72)] p-1.5 shadow-panel backdrop-blur-md transition-colors duration-300 hover:border-gold/80"
    >
      <CornerPip className="-left-1 -top-1" />
      <CornerPip className="-right-1 -top-1" />
      <CornerPip className="-bottom-1 -left-1" />
      <CornerPip className="-bottom-1 -right-1" />

      <div className="rounded-[2px] border border-gold/25 px-3 py-5 text-center">
        <div className="mx-auto flex h-24 w-[4.5rem] items-end justify-center rounded-t-full border border-gold/40 bg-gradient-to-b from-gold/20 to-transparent pb-3">
          <span className="font-display text-lg font-medium text-gold-soft">
            {judge.initials}
          </span>
        </div>

        <div className="mx-auto mt-4 h-px w-10 bg-gold/30" />

        <h3 className="mt-3 font-display text-[17px] font-normal leading-tight text-cream">
          {judge.name}
        </h3>
        <p className="micro-label mt-2 leading-relaxed">{judge.role}</p>
      </div>
    </div>
  )
}

export default function Judges() {
  const rootRef = useRef(null)
  // One row of five — revealed as a single group so the stagger reads as the
  // frames lighting up in turn, without five screens of pinned scroll.
  usePinnedBeats(rootRef, '[data-beat]', {
    length: '+=80%',
    y: 36,
    group: 5,
    headingSelector: '[data-heading]',
  })
  useSectionExit(rootRef)

  return (
    <section
      id="judges"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-24"
    >
      <div data-veil className="relative w-full max-w-6xl">
        <div data-heading className="mb-14 text-center">
          <h2 className="section-heading">Judges</h2>
          <p className="eyebrow">Coming Soon</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {judges.map((judge) => (
            <VintageFrame key={judge.id} judge={judge} />
          ))}
        </div>
      </div>
    </section>
  )
}
