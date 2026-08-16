import { useEffect } from 'react'
import gsap from 'gsap'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * A single, restrained entrance: items fade and rise in once as they reach
 * the viewport, then stay put. No pin, no scroll-locking, no per-card
 * choreography — the illustrations already carry the whimsy, so the UI just
 * needs to arrive quietly and get out of the way.
 *
 * Respects prefers-reduced-motion by skipping straight to the final state.
 */
export function useEntrance(scopeRef, selector, options = {}) {
  const { y = 16, duration = 0.6, stagger = 0.08, start = 'top 85%' } = options

  useEffect(() => {
    if (!scopeRef.current) return
    const items = gsap.utils.toArray(selector, scopeRef.current)
    if (!items.length) return

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power2.out',
          scrollTrigger: { trigger: scopeRef.current, start, toggleActions: 'play none none none' },
        }
      )
    }, scopeRef)
    return () => ctx.revert()
  }, [])
}
