import { useRef } from 'react'
import { usePinnedBeats, useSectionExit } from '../hooks/useReveal.js'

const stats = [
  { value: '12', label: 'Hours' },
  { value: '~30', label: 'Participants' },
  { value: 'TBD', label: 'Prizes' },
  { value: 'TBD', label: 'Judges' },
]

export default function About() {
  const rootRef = useRef(null)
  usePinnedBeats(rootRef, '[data-beat]', {
    length: '+=115%',
    headingSelector: '[data-heading]',
  })
  useSectionExit(rootRef)

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-24"
    >
      <div data-veil className="w-full max-w-6xl">
        <div data-heading className="mb-14 text-center">
          <h2 className="section-heading">About</h2>
          <p className="eyebrow">Why Pivot?</p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <div data-beat className="panel-card p-8 sm:p-10">
            <h3 className="font-display text-2xl font-normal text-gold-soft">Why Pivot?</h3>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/65">
              PIVOT is a 12-hour adaptive hackathon where the challenge unfolds throughout the day.
              Instead of revealing the entire challenge at the beginning, teams receive new
              information every two hours that changes how they should think about their solution.
              The first three reveals are shared by every team, while the final reveal&mdash;the
              Pivot&mdash;is unique to each team.
            </p>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/65">
              Real product development is iterative. Requirements change, customers change,
              priorities shift, and products evolve. PIVOT recreates that experience by rewarding
              adaptability instead of rewarding whoever picked the best idea at the start. Success
              isn&rsquo;t measured by sticking to the original plan&mdash;it&rsquo;s measured by how
              well teams pivot when the plan changes.
            </p>
          </div>

          <div data-beat className="panel-card px-6 py-6 sm:px-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl font-normal text-cream">{stat.value}</div>
                  <div className="micro-label mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
