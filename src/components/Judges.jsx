import { useRef } from 'react'
import { usePinnedBeats, useSectionExit } from '../hooks/useReveal.js'
import simonImg from '../assets/img/judges/simon.jpg'
import rajiImg from '../assets/img/judges/raji.jpg'
import osherImg from '../assets/img/judges/osher.jpg'
import alanImg from '../assets/img/judges/alan.jpg'

// linkedin: '#' placeholders until the real profile URLs come in — swap them
// in and the badge just starts working, no other code changes needed.
const judges = [
  { id: 1, name: 'Simon Ryu', role: 'Cresta', photo: simonImg, linkedin: '#' },
  { id: 2, name: 'Raji RV', role: 'IBM', photo: rajiImg, linkedin: '#' },
  {
    id: 3,
    name: 'Osher Ahn Clifford',
    role: 'ex Shopify, Cohere & Wealthsimple',
    photo: osherImg,
    linkedin: '#',
  },
  { id: 4, name: 'Alan Zhang', role: 'BuildBane, BMO', photo: alanImg, linkedin: '#' },
  { id: 5, name: 'Coming Soon', role: '', initials: '?', linkedin: null },
]

function LinkedInBadge({ href }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View LinkedIn profile"
      onClick={(e) => e.stopPropagation()}
      className="absolute -bottom-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-gold/50 bg-[rgba(20,10,32,0.92)] text-gold-soft shadow-panel transition-colors duration-200 hover:border-gold hover:text-gold"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    </a>
  )
}

function CornerPip({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1.5 w-1.5 rotate-45 bg-gold/70 ${className}`}
    />
  )
}

/**
 * Vintage gold frame — double rule, arched portrait plate, corner pips. Flat
 * throughout: no blur, no glow, just gold-on-plum, so it reads like a
 * printed frame rather than a UI-trend glass panel.
 */
function VintageFrame({ judge }) {
  return (
    <div
      data-beat
      className="group relative rounded-sm border border-gold/45 bg-[rgba(42,26,58,0.72)] p-1.5 transition-colors duration-300 hover:border-gold/80"
    >
      <CornerPip className="-left-1 -top-1" />
      <CornerPip className="-right-1 -top-1" />
      <CornerPip className="-bottom-1 -left-1" />
      <CornerPip className="-bottom-1 -right-1" />

      <div className="rounded-[2px] border border-gold/25 px-3 py-5 text-center">
        {/* Un-clipped wrapper so the LinkedIn badge can sit proud of the arch
            without being cut off by the photo's own overflow-hidden. */}
        <div className="relative mx-auto w-full max-w-[7.5rem]">
          <div
            className="w-full overflow-hidden border border-gold/40 bg-[rgba(20,10,32,0.6)]"
            style={{ aspectRatio: '3 / 4', borderRadius: '56px 56px 6px 6px' }}
          >
            {judge.photo ? (
              <img
                src={judge.photo}
                alt={judge.name}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-2xl font-medium text-gold-soft/60">
                  {judge.initials}
                </span>
              </div>
            )}
          </div>
          <LinkedInBadge href={judge.linkedin} />
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
