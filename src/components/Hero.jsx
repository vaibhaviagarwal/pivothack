import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCountdown } from '../hooks/useCountdown.js'

// Start time is assumed 09:00 — change if the day starts elsewhere.
const EVENT_DATE = '2026-09-13T09:00:00'

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center px-3.5 sm:px-5">
      <span className="font-display text-xl font-medium tabular-nums text-gold sm:text-2xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-sans text-xs text-cream/45">{label}</span>
    </div>
  )
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)
  const rootRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero-item]', { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        '[data-hero-item]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      )

      // The wordmark drifts up and dims as you leave, handing off to About.
      gsap.to('[data-hero-stack]', {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-28 text-center"
    >
      <div data-hero-stack className="flex flex-col items-center">
        <p data-hero-item className="font-sans text-sm text-cream/55">
          September 13, 2026 &middot; Waterloo
        </p>

        <h1
          data-hero-item
          className="text-glow-warm mt-6 font-display text-6xl font-normal leading-none tracking-wide text-cream sm:mt-8 sm:text-7xl md:text-8xl"
        >
          PIVOT
        </h1>

        <p
          data-hero-item
          className="text-balance mt-7 max-w-md font-sans text-base font-light text-cream/70 sm:text-lg"
        >
          A 12-hour hackathon where the challenge changes as you build.
        </p>

        <a
          data-hero-item
          href="https://wygo.world/pivot"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn mt-9"
        >
          Apply
        </a>

        <div
          data-hero-item
          className="mt-12 flex items-center rounded-xl border border-gold/20 bg-[rgba(48,26,58,0.5)] px-2 py-2.5"
        >
          <CountdownUnit value={days} label="Days" />
          <span className="h-7 w-px bg-gold/15" />
          <CountdownUnit value={hours} label="Hours" />
          <span className="h-7 w-px bg-gold/15" />
          <CountdownUnit value={minutes} label="Mins" />
          <span className="h-7 w-px bg-gold/15" />
          <CountdownUnit value={seconds} label="Secs" />
        </div>

        <p data-hero-item className="mt-7 font-sans text-sm text-cream/45">
          Backed by Waterloo Tech Week
        </p>
      </div>

      <div
        data-hero-item
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-cream/35"
      >
        <span className="font-sans text-xs">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  )
}
