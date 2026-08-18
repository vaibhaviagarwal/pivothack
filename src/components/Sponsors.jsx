import { useRef } from 'react'
import { useEntrance } from '../hooks/useReveal.js'
import buildBaneLogo from '../assets/img/sponsors/buildbane.png'
import buildersClubLogo from '../assets/img/sponsors/builders-club.png'

/**
 * Venue and food sponsors are confirmed; prize sponsors are not, so this
 * stays honest about the split — real logos for what's locked in, the same
 * plain storybook note as before for what's still TBD. No placeholder
 * tiers, no invented prize sponsors.
 *
 * Full-width, centered section — no outer box. Only the individual logo
 * tiles get a backdrop (a solid cream plate, for real contrast against the
 * illustration); the heading and subtitle sit directly on the scene like
 * every other section's heading does.
 */
const sponsors = [
  { name: 'Builders Club', label: 'Venue Sponsor', logo: buildersClubLogo },
  { name: 'BuildBane', label: 'Food Sponsor', logo: buildBaneLogo },
]

export default function Sponsors() {
  const rootRef = useRef(null)
  useEntrance(rootRef, '[data-reveal]', { y: 14 })

  return (
    <section id="sponsors" ref={rootRef} className="relative z-10 w-full py-28 sm:py-36">
      <div className="content-container text-center">
        <h2 data-reveal className="section-heading text-center">
          Sponsors &amp; prizes
        </h2>
        <p data-reveal className="body-text mx-auto mt-4 max-w-md">
          Prize sponsors will be announced soon.
        </p>

        <div data-reveal className="mx-auto mt-14 flex flex-wrap items-start justify-center gap-x-14 gap-y-10">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className="flex flex-col items-center gap-3">
              <div className="sponsor-plate">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-8 w-auto object-contain sm:h-9"
                />
              </div>
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-cream/75">
                {sponsor.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
