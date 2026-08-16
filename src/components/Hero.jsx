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
      <span className="mt-1 font-sans text-[8px] uppercase tracking-widest2 text-cream/40 sm:text-[9px]">
        {label}
      </span>
    </div>
  )
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-item]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.13, ease: 'power3.out', delay: 0.25 }
      )

      // The wordmark drifts up and dims as you leave, handing off to the Meadow.
      gsap.to('[data-hero-stack]', {
        y: -70,
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
        <p
          data-hero-item
          className="font-sans text-[10px] font-medium uppercase tracking-widest3 text-gold-dim sm:text-[11px]"
        >
          September 13, 2026
        </p>

        <h1
          data-hero-item
          className="mt-8 font-display text-6xl font-normal leading-none tracking-widest2 text-cream sm:mt-10 sm:text-7xl md:text-8xl lg:text-9xl"
        >
          PIVOT
        </h1>

        <p
          data-hero-item
          className="text-balance mt-8 max-w-md font-sans text-sm font-light text-cream/70 sm:text-base"
        >
          A 12-hour adaptive hackathon where every team is forced to rethink their solution.
        </p>

        <a
          data-hero-item
          href="https://wygo.world/pivot"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn mt-10"
        >
          Apply
        </a>

        <div
          data-hero-item
          className="mt-14 flex items-center rounded-xl border border-white/10 bg-[rgba(26,15,40,0.45)] px-2 py-2.5 backdrop-blur-md"
        >
          <CountdownUnit value={days} label="Days" />
          <span className="h-7 w-px bg-white/10" />
          <CountdownUnit value={hours} label="Hours" />
          <span className="h-7 w-px bg-white/10" />
          <CountdownUnit value={minutes} label="Mins" />
          <span className="h-7 w-px bg-white/10" />
          <CountdownUnit value={seconds} label="Secs" />
        </div>

        <p
          data-hero-item
          className="mt-8 font-sans text-[10px] font-medium uppercase tracking-widest3 text-cream/45"
        >
          Backed by Waterloo Tech Week
        </p>
      </div>

      <div
        data-hero-item
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-cream/35"
      >
        <span className="font-sans text-[9px] uppercase tracking-widest3">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  )
}
