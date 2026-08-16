import { useRef } from 'react'
import { useEntrance } from '../hooks/useReveal.js'

/**
 * The detailed schedule isn't confirmed yet, so this section is deliberately
 * small: one restrained line group over a quiet part of the waterfall, not a
 * fake timeline. It should read as "intentionally minimal," not "unfinished."
 */
export default function Schedule() {
  const rootRef = useRef(null)
  useEntrance(rootRef, '[data-reveal]', { y: 14 })

  return (
    <section id="schedule" ref={rootRef} className="relative z-10 w-full py-28 sm:py-36">
      <div className="content-container">
        {/* A small storybook sign sitting naturally in the waterfall scene —
            not a large panel. Sized to its content, waterfall stays visible
            all around it. */}
        <div data-reveal className="sign-card">
          <h2 className="font-display text-2xl font-normal text-cream sm:text-[1.75rem]">
            Schedule
          </h2>
          <p className="body-text mt-3">September 13, 2026</p>
          <p className="supporting-text mt-1">12 hours &middot; Waterloo</p>
          <p className="body-text mt-4">Full schedule will be shared soon.</p>
        </div>
      </div>
    </section>
  )
}
