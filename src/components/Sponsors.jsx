import { useRef } from 'react'
import { useEntrance } from '../hooks/useReveal.js'

/**
 * Sponsor and prize details aren't confirmed yet. No fake tiers, no TBD
 * grid — just a plain statement, same treatment as Schedule. When real
 * sponsor logos exist, add a simple evenly-spaced row below this message.
 */
export default function Sponsors() {
  const rootRef = useRef(null)
  useEntrance(rootRef, '[data-reveal]', { y: 14 })

  return (
    <section id="sponsors" ref={rootRef} className="relative z-10 w-full py-28 sm:py-36">
      <div className="content-container">
        {/* Small warm sign, same family as Schedule — the lantern-lit market
            scene stays the focal point. */}
        <div data-reveal className="sign-card">
          <h2 className="font-display text-2xl font-normal text-cream sm:text-[1.75rem]">
            Sponsors &amp; prizes
          </h2>
          <p className="body-text mt-3">Details will be announced soon.</p>
        </div>
      </div>
    </section>
  )
}
