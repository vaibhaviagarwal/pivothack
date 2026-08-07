import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Scroll-linked reveal. Unlike a one-shot fade, the position of every item is a
 * function of where you are on the page — keep scrolling and it keeps moving,
 * scroll back and it reverses.
 */
export function useScrubReveal(scopeRef, selector, options = {}) {
  const {
    start = 'top 88%',
    end = 'top 40%',
    y = 44,
    stagger = 0.12,
    scrub = 0.3,
  } = options

  useEffect(() => {
    if (!scopeRef.current) return
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(selector)
      if (!items.length) return
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          stagger,
          scrollTrigger: { trigger: scopeRef.current, start, end, scrub },
        }
      )
    }, scopeRef)
    return () => ctx.revert()
  }, [])
}

/**
 * Kept as a no-op so sections can keep declaring intent by calling it.
 *
 * Section content opacity is driven by SceneStage instead — it already knows
 * where every section sits each frame, and a second independent system fought
 * with `pin: true` (a pinned element's `bottom` never travels through the
 * viewport, so `bottom 78%` resolved to the wrong scroll position and blanked
 * the screen between sections).
 */
export function useSectionExit() {}

function chunk(arr, size) {
  if (size <= 1) return arr.map((item) => [item])
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/**
 * Pin the section and let its content arrive beat by beat.
 *
 * Two things matter for this not to feel broken:
 *  - the heading is revealed on ENTRY, before the pin starts, so you never
 *    arrive to a blank screen;
 *  - the beats all land in the first ~60% of the pin, and the rest is a hold,
 *    so you're never scrolling through a half-populated grid.
 *
 * `group` reveals items N at a time — a 3-column grid should arrive a row at a
 * time, otherwise the partially-filled grid reads as a layout bug.
 *
 * Only pins when the viewport is wide AND tall enough to hold the content;
 * gsap.matchMedia rebuilds on resize so split-screen behaves.
 */
export function usePinnedBeats(scopeRef, selector, options = {}) {
  const { length = '+=110%', y = 44, headingSelector = null, group = 1 } = options

  useEffect(() => {
    if (!scopeRef.current) return
    const scope = scopeRef.current
    const mm = gsap.matchMedia()

    mm.add(
      {
        canPin: '(min-width: 1024px) and (min-height: 620px)',
        flat: '(max-width: 1023px), (max-height: 619px)',
      },
      (context) => {
        const { canPin } = context.conditions
        const items = gsap.utils.toArray(selector, scope)
        if (!items.length) return

        const heading = headingSelector ? gsap.utils.toArray(headingSelector, scope) : []

        if (!canPin) {
          if (heading.length) {
            gsap.fromTo(
              heading,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: scope, start: 'top 80%' },
              }
            )
          }
          gsap.fromTo(
            items,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: scope, start: 'top 82%', end: 'center 58%', scrub: 0.3 },
            }
          )
          return
        }

        // Heading lands before the pin ever engages.
        if (heading.length) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: { trigger: scope, start: 'top 70%', toggleActions: 'play none none reverse' },
            }
          )
        }

        const groups = chunk(items, group)
        const BEAT = 1
        const HOLD = groups.length * 0.7

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: length,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        groups.forEach((set, i) => {
          tl.fromTo(
            set,
            { opacity: 0, y },
            { opacity: 1, y: 0, duration: BEAT, stagger: 0.12, ease: 'power2.out' },
            i * BEAT * 0.85
          )
        })

        tl.to({}, { duration: HOLD })
      },
      scope
    )

    return () => mm.revert()
  }, [])
}
