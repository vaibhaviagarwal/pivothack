import { useRef } from 'react'
import { useEntrance } from '../hooks/useReveal.js'

const stats = [
  { value: '12', label: 'hours' },
  { value: '~30', label: 'participants' },
]

export default function About() {
  const rootRef = useRef(null)
  useEntrance(rootRef, '[data-reveal]', { y: 16, stagger: 0.1 })

  return (
    <section id="about" ref={rootRef} className="relative z-10 w-full py-28 sm:py-36">
      <div className="content-container">
        {/* A compact warm card that hugs the text instead of a large dark
            rectangle — the golden tree stays the star of the scene. */}
        <div data-reveal className="panel-card max-w-lg px-7 py-8 sm:px-9 sm:py-10">
          <h2 className="section-heading">About</h2>

          <div className="mt-5">
            <p className="body-text">
              PIVOT is a 12-hour hackathon, but you don&rsquo;t get the full challenge up front.
              Every two hours we drop new information that changes how you should be thinking
              about your solution. Everyone gets the same first three reveals. The last one, the
              actual Pivot, is different for every team.
            </p>
            <p className="body-text mt-4">
              We built it this way because that&rsquo;s what building something real actually
              feels like. Plans change, requirements shift, priorities get rewritten halfway
              through. PIVOT isn&rsquo;t about who walked in with the best idea &mdash; it&rsquo;s
              about who can actually roll with it when things change.
            </p>

            <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-baseline gap-2 ${i > 0 ? 'border-l border-lavender-light/20 pl-8' : ''}`}
                >
                  <span className="font-display text-2xl text-gold-soft">{stat.value}</span>
                  <span className="supporting-text">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
