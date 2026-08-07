import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { useSectionExit } from '../hooks/useReveal.js'

const events = [
  { time: 'TBD', title: 'TBD', desc: 'Schedule coming soon.' },
  { time: 'TBD', title: 'TBD', desc: 'TBD' },
  { time: 'TBD', title: 'TBD', desc: 'TBD' },
  { time: 'TBD', title: 'TBD', desc: 'TBD' },
  { time: 'TBD', title: 'TBD', desc: 'TBD' },
  { time: 'TBD', title: 'TBD', desc: 'TBD' },
  { time: 'TBD', title: 'TBD', desc: 'TBD' },
]

/**
 * Traced from the waterfall in stream.mp4 by finding the bright warm column,
 * from the lip down through the plunge into the pool. Horizontal wobble is
 * damped to 35% — a fall should read as a fall, not a meander.
 *
 * Coordinates are in the video's own 1280x720 space; the SVG below re-crops
 * with `slice`, which is the same maths as object-cover, so this stays glued
 * to the water at any window size.
 *
 * Clamped to y 145–615 on purpose. Under object-cover the visible slice of the
 * frame is VB_W / viewport-aspect tall, so a 2.4:1 window only ever shows
 * y 93–627. Running the path to the pool at y=695 put the last waypoint below
 * the fold on any wide screen.
 */
const VB_W = 1280
const VB_H = 720
// Straight vertical fall line, centred on the traced mean of the water column.
const PATH_D = 'M 682,145 L 682,615'

function EventCard({ event, index, total }) {
  return (
    <div className="panel-card w-full px-7 py-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="micro-label">{event.time}</p>
        <p className="font-sans text-[10px] tabular-nums tracking-widest2 text-cream/30">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>
      <p className="mt-2 font-display text-2xl font-normal text-cream sm:text-3xl">{event.title}</p>
      <p className="mt-2 font-sans text-sm font-light leading-relaxed text-cream/60">{event.desc}</p>
    </div>
  )
}

export default function Schedule() {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const markerRef = useRef(null)
  const cardRef = useRef(null)
  const dotRefs = useRef([])
  const [active, setActive] = useState(0)

  // The river only reads as a river when the frame is wide enough that
  // object-cover hasn't cropped it away. Otherwise: plain timeline.
  const riverMode = useMediaQuery('(min-width: 900px) and (min-aspect-ratio: 5/4)')
  useSectionExit(rootRef)

  useEffect(() => {
    if (!riverMode) return
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length * 0.96}`

    // Event markers sit at even intervals along the river.
    const stops = events.map((_, i) => (i + 0.5) / events.length)
    stops.forEach((t, i) => {
      const p = path.getPointAtLength(t * length)
      const dot = dotRefs.current[i]
      if (dot) {
        dot.setAttribute('cx', p.x)
        dot.setAttribute('cy', p.y)
      }
    })

    const ctx = gsap.context(() => {
      const state = { progress: 0 }

      gsap.to(state, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=190%',
          // Lenis already smooths the input; a scrub value on top of it is a
          // second lag. `true` locks 1:1 to the smoothed scroll.
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Start with a little of the river already lit, so the first beat
            // doesn't sit next to a bare frame.
            const p = 0.04 + self.progress * 0.96
            path.style.strokeDashoffset = `${length * (1 - p)}`

            const point = path.getPointAtLength(p * length)
            if (markerRef.current) {
              markerRef.current.setAttribute('cx', point.x)
              markerRef.current.setAttribute('cy', point.y)
              markerRef.current.style.opacity = 1
            }

            dotRefs.current.forEach((dot, i) => {
              if (!dot) return
              dot.style.opacity = p >= stops[i] ? 1 : 0.25
            })

            let idx = 0
            for (let i = 0; i < stops.length; i++) if (p >= stops[i] - 0.5 / events.length) idx = i
            setActive(idx)
          },
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [riverMode])

  // Crossfade the card whenever the active beat changes.
  useEffect(() => {
    if (!riverMode || !cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: true }
    )
  }, [active, riverMode])

  if (!riverMode) {
    return (
      <section
        id="schedule"
        ref={rootRef}
        className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-32"
      >
        <div data-veil className="w-full max-w-xl">
          <div className="mb-12 text-center">
            <h2 className="section-heading">Schedule</h2>
            <p className="eyebrow">Coming Soon</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-gold/70 via-gold/40 to-transparent" />
            <div className="flex flex-col gap-4">
              {events.map((ev, i) => (
                <div key={ev.title} className="relative">
                  <span className="absolute -left-8 top-6 h-2.5 w-2.5 -translate-x-[3px] rounded-full bg-gold shadow-glow" />
                  <div className="panel-card px-6 py-5">
                    <p className="micro-label">{ev.time}</p>
                    <p className="mt-1.5 font-display text-xl font-normal text-cream">{ev.title}</p>
                    <p className="mt-1 font-sans text-[13px] font-light text-cream/55">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="schedule" ref={rootRef} className="relative z-10 h-screen w-full overflow-hidden">
      {/* Overlay matches object-cover exactly, so it tracks the river on resize */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        data-veil
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <filter id="riverGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* No vectorEffect here: non-scaling-stroke resolves dashes in screen
            units while getTotalLength() is in user units, which tiles the dash
            pattern instead of drawing the line once. */}
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="#e0b64a"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#riverGlow)"
        />

        {events.map((ev, i) => (
          <circle
            key={ev.title}
            ref={(el) => (dotRefs.current[i] = el)}
            r="3.5"
            fill="#f0d488"
            style={{ opacity: 0.25, transition: 'opacity .3s' }}
            filter="url(#riverGlow)"
          />
        ))}

        <circle
          ref={markerRef}
          r="6"
          fill="#ffffff"
          style={{ opacity: 0 }}
          filter="url(#riverGlow)"
        />
      </svg>

      {/* The falls are a bright column dead centre, so the type lives in a
          left rail over the dark cliff rather than centred over the water. */}
      <div data-veil className="relative flex h-full items-center">
        <div className="w-full max-w-sm pl-8 lg:max-w-md lg:pl-16 xl:pl-24">
          <h2 className="section-heading !text-4xl sm:!text-5xl">Schedule</h2>
          <p className="eyebrow">Coming Soon</p>

          {/* One card at a time — the water does the moving */}
          <div ref={cardRef} className="mt-10">
            <EventCard event={events[active]} index={active} total={events.length} />
          </div>
        </div>
      </div>
    </section>
  )
}
