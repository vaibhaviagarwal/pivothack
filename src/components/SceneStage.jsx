import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scenes } from '../scenes.js'

/**
 * The world behind the page.
 *
 * Every backdrop lives in one fixed layer instead of inside its own section.
 * Each frame we work out how close each section is to the middle of the
 * viewport and crossfade the backdrops by that weight — so scenes dissolve into
 * each other and there is no seam anywhere.
 *
 * Performance note: section positions are measured once per refresh (and on
 * resize) into document space, never inside the ticker. Reading
 * getBoundingClientRect() per frame forces a layout per section per frame,
 * which was enough to make the scroll feel rough while videos were decoding.
 */

const FADE_SPAN = 0.62
const DRIFT_SCALE = 0.1
const DRIFT_RISE = 22

// Content ramp. The outgoing section reaches 0 exactly at its bottom edge, so
// two sections' text is never legible at once — that's what made stray labels
// appear to float over the next scene. The incoming section leads by CONTENT_LEAD
// so it's already half-up by then and the seam never goes empty.
const CONTENT_BAND = 0.3
const CONTENT_LEAD = 0.15

function smoothstep(t) {
  return t * t * (3 - 2 * t)
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

export default function SceneStage() {
  const layerRefs = useRef([])
  const artRefs = useRef([])
  const mediaRefs = useRef([])
  const scrimRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = scenes.map((s) => document.getElementById(s.id))

    // Document-space bounds, refreshed only when layout can actually change.
    let bounds = []
    let veils = []
    const measure = () => {
      const y = window.scrollY || window.pageYOffset || 0
      bounds = els.map((el) => {
        if (!el) return null
        // A pinned section stays on screen for its whole pin duration, but the
        // element itself is only one viewport tall. GSAP's pin-spacer holds the
        // real on-screen span, so measure that when it exists — otherwise the
        // content fades out while the section is still pinned in view.
        const parent = el.parentElement
        const target =
          parent && parent.classList.contains('pin-spacer') ? parent : el
        const r = target.getBoundingClientRect()
        return { top: r.top + y, height: r.height || 1 }
      })
      veils = els.map((el) => (el ? Array.from(el.querySelectorAll('[data-veil]')) : []))
    }

    const weights = new Array(scenes.length).fill(0)
    const lastOpacity = new Array(scenes.length).fill(-1)
    const lastVeil = new Array(scenes.length).fill(-1)

    const update = () => {
      if (!bounds.length) return
      const vh = window.innerHeight
      const scrollY = window.scrollY || window.pageYOffset || 0
      const centre = scrollY + vh / 2
      const fade = vh * FADE_SPAN
      let total = 0

      for (let i = 0; i < scenes.length; i++) {
        const b = bounds[i]
        if (!b) {
          weights[i] = 0
          continue
        }
        const top = b.top
        const bottom = b.top + b.height

        let dist = 0
        if (centre < top) dist = top - centre
        else if (centre > bottom) dist = centre - bottom

        const w = dist >= fade ? 0 : smoothstep(1 - dist / fade)
        weights[i] = w
        total += w

        // Content: fully opaque through the body of the section, crossfading
        // across a band straddling each edge. Immune to pin geometry, because
        // it's pure document-space maths rather than a ScrollTrigger.
        const band = vh * CONTENT_BAND
        const lead = vh * CONTENT_LEAD
        const fadeIn = clamp01((centre - top + lead) / band)
        const fadeOut = clamp01((bottom - centre) / band)
        const veilOpacity = Math.min(fadeIn, fadeOut)

        if (Math.abs(veilOpacity - lastVeil[i]) > 0.004) {
          const nodes = veils[i]
          if (nodes) {
            const v = veilOpacity.toFixed(3)
            for (let n = 0; n < nodes.length; n++) nodes[n].style.opacity = v
          }
          lastVeil[i] = veilOpacity
        }

        if (w > 0 && !scenes[i].noDrift) {
          const progress = clamp01((centre - top) / b.height)
          const art = artRefs.current[i]
          if (art) {
            const scale = 1 + progress * DRIFT_SCALE
            const rise = (0.5 - progress) * DRIFT_RISE
            art.style.transform = `translate3d(0, ${rise.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
          }
        }
      }

      if (total === 0) {
        const idx = bounds[0] && centre < bounds[0].top ? 0 : scenes.length - 1
        weights[idx] = 1
        total = 1
      }

      for (let i = 0; i < scenes.length; i++) {
        const opacity = weights[i] / total
        // Skip DOM writes when nothing meaningfully changed.
        if (Math.abs(opacity - lastOpacity[i]) > 0.002) {
          const layer = layerRefs.current[i]
          if (layer) layer.style.opacity = opacity.toFixed(4)
          lastOpacity[i] = opacity
        }

        const media = mediaRefs.current[i]
        if (media && media.tagName === 'VIDEO') {
          if (opacity > 0.04 && !reduced) {
            if (media.paused) {
              const p = media.play()
              if (p && typeof p.catch === 'function') p.catch(() => {})
            }
          } else if (!media.paused) {
            media.pause()
          }
        }
      }

      if (scrimRef.current) {
        let scrim = 0
        for (let i = 0; i < scenes.length; i++) scrim += (weights[i] / total) * scenes[i].scrim
        scrimRef.current.style.opacity = scrim.toFixed(3)
      }
    }

    measure()
    update()

    const onResize = () => {
      measure()
      update()
    }

    // ScrollTrigger reverts pins before firing refresh, so this measures the
    // natural layout rather than a pinned-mid-flight one.
    ScrollTrigger.addEventListener('refresh', measure)
    gsap.ticker.add(update)
    window.addEventListener('resize', onResize)

    return () => {
      ScrollTrigger.removeEventListener('refresh', measure)
      gsap.ticker.remove(update)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-midnight-deep"
    >
      {scenes.map((scene, i) => (
        <div
          key={scene.id}
          ref={(el) => (layerRefs.current[i] = el)}
          className="absolute inset-0 opacity-0 will-change-[opacity]"
        >
          <div
            ref={(el) => (artRefs.current[i] = el)}
            className="absolute inset-0 will-change-transform"
          >
            {scene.type === 'video' ? (
              <video
                ref={(el) => (mediaRefs.current[i] = el)}
                className="absolute inset-0 h-full w-full object-cover"
                poster={scene.poster}
                autoPlay={i === 0}
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'metadata'}
              >
                <source src={scene.webm} type="video/webm" />
                <source src={scene.mp4} type="video/mp4" />
              </video>
            ) : (
              <img
                ref={(el) => (mediaRefs.current[i] = el)}
                src={scene.src}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      ))}

      <div ref={scrimRef} className="absolute inset-0 bg-midnight-deep" style={{ opacity: 0.5 }} />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,4,20,0) 30%, rgba(10,4,20,0.6) 100%)',
        }}
      />
    </div>
  )
}
