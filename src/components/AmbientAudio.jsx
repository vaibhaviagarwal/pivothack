import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Layered ambient sound.
 *
 * Instead of one looping track, this crossfades a small stack of loops so the
 * world actually breathes with the scroll: a dreamy, far-away, radio-toned
 * bed hums throughout, and a second "scene" layer swells in on top of it for
 * water at the Stream, forest + birds for Judges/Team, and a soft closing
 * gust of wind for the FAQ village at the very end. Sponsors deliberately
 * has no accent layer — just the bed on its own.
 *
 * Every non-bed layer was reprocessed offline to match the bed's tonal
 * character (narrow band, a touch of the same echo, a compressor to tame
 * transient peaks) so nothing swells in sounding tonally jarring against it
 * — see git history for the exact ffmpeg chains if these ever need re-tuning.
 *
 * Each layer is its own <audio>, loaded from /public/audio/*.mp3 at runtime
 * (not bundled) so missing files degrade quietly — a layer that 404s just
 * never plays, and the whole control hides itself if nothing loaded at all.
 * Nothing plays until the visitor clicks: autoplay-with-sound is blocked by
 * every browser anyway, and it's rude besides.
 */

const STORAGE_KEY = 'pivot:sound'
const FADE = 1.6
const CROSSFADE = 2.2

// id: which section ids swell this layer in. Empty array = always-on bed.
const LAYERS = [
  // Only the first 20s of the original track were needed — trimmed and
  // self-crossfaded at the seam (tail blended into head) so the loop point
  // is inaudible instead of clicking every repeat.
  { id: 'bed', src: '/audio/dreamy-radio-loop20.mp3', volume: 0.16, sections: [] },
  { id: 'water', src: '/audio/waterfall-soft.mp3', volume: 0.22, sections: ['schedule'] },
  { id: 'night', src: '/audio/soundreality-forest-ambience-540695.mp3', volume: 0.12, sections: ['judges', 'team'] },
  { id: 'birds', src: '/audio/birds-soft.mp3', volume: 0.13, sections: ['judges', 'team'] },
  // The original wind-gust bed, repurposed as a soft closing breeze for the
  // last section instead of retired — reprocessed the same way as water/birds.
  { id: 'gust', src: '/audio/wind-soft.mp3', volume: 0.1, sections: ['faq'] },
]

// Rolls the harsh top end off every layer so the bed reads as a soft murmur
// instead of a bright recording playing through phone speakers.
const SOFTEN_HZ = 1800

function SpeakerIcon({ on }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9.5v5h3.2L12 18.5v-13L7.2 9.5H4Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {on ? (
        <>
          <path d="M15.4 9.2a4 4 0 0 1 0 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17.8 6.8a7.4 7.4 0 0 1 0 10.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <path d="m16 9.5 4.5 5m0-5-4.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  )
}

export default function AmbientAudio({ activeId }) {
  const layersRef = useRef({}) // id -> { audio, volume, sections, alive }
  const audioCtxRef = useRef(null)
  const [readyLayerIds, setReadyLayerIds] = useState([])
  const [checked, setChecked] = useState(false)
  const [on, setOn] = useState(false)

  // Boot every layer once. Each one that fails to load just marks itself dead.
  useEffect(() => {
    let cancelled = false

    const Ctx = window.AudioContext || window.webkitAudioContext
    const audioCtx = Ctx ? new Ctx() : null
    audioCtxRef.current = audioCtx

    const pending = LAYERS.map((layer) => {
      const audio = new Audio(layer.src)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = 0

      // Route through a gentle lowpass so the loops read as a soft murmur
      // rather than a bright recording — falls back to plain playback if
      // Web Audio isn't available.
      if (audioCtx) {
        const source = audioCtx.createMediaElementSource(audio)
        const filter = audioCtx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = SOFTEN_HZ
        source.connect(filter).connect(audioCtx.destination)
      }

      layersRef.current[layer.id] = { audio, ...layer, alive: true }

      return new Promise((resolve) => {
        const onError = () => {
          layersRef.current[layer.id].alive = false
          resolve(null)
        }
        const onReady = () => resolve(layer.id)
        audio.addEventListener('error', onError, { once: true })
        audio.addEventListener('canplaythrough', onReady, { once: true })
      })
    })

    Promise.all(pending).then((ids) => {
      if (cancelled) return
      setReadyLayerIds(ids.filter(Boolean))
      setChecked(true)
    })

    return () => {
      cancelled = true
      Object.values(layersRef.current).forEach(({ audio }) => {
        gsap.killTweensOf(audio)
        audio.pause()
      })
    }
  }, [])

  // Master on/off — fades every live layer up or down together.
  useEffect(() => {
    if (!checked) return
    readyLayerIds.forEach((id) => {
      const layer = layersRef.current[id]
      if (!layer) return
      const { audio } = layer
      gsap.killTweensOf(audio)
      if (on) {
        const p = audio.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
        const target = layer.sections.length === 0 || layer.sections.includes(activeId) ? layer.volume : 0
        gsap.to(audio, { volume: target, duration: FADE, ease: 'power2.out' })
      } else {
        gsap.to(audio, { volume: 0, duration: FADE * 0.6, ease: 'power2.out', onComplete: () => audio.pause() })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, checked])

  // Scene changes — crossfade the scene-specific layers, leave the wind bed alone.
  useEffect(() => {
    if (!on || !checked) return
    readyLayerIds.forEach((id) => {
      const layer = layersRef.current[id]
      if (!layer || layer.sections.length === 0) return
      const target = layer.sections.includes(activeId) ? layer.volume : 0
      gsap.to(layer.audio, { volume: target, duration: CROSSFADE, ease: 'sine.inOut' })
    })
  }, [activeId, on, checked, readyLayerIds])

  // Don't keep decoding audio for a tab nobody is looking at.
  useEffect(() => {
    const onVisibility = () => {
      Object.values(layersRef.current).forEach(({ audio }) => {
        if (document.hidden) {
          audio.pause()
        } else if (on && audio.volume > 0.001) {
          const p = audio.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        }
      })
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [on])

  // Restore the visitor's last choice once we know a layer actually works.
  useEffect(() => {
    if (!checked || readyLayerIds.length === 0) return
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'on') setOn(true)
    } catch {}
  }, [checked, readyLayerIds])

  const toggle = () => {
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume()
    setOn((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
      } catch {}
      return next
    })
  }

  if (checked && readyLayerIds.length === 0) return null

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Turn ambient sound off' : 'Turn ambient sound on'}
      title={on ? 'Sound on' : 'Sound off'}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
        on
          ? 'border-gold/50 bg-[rgba(42,26,58,0.8)] text-gold-soft'
          : 'border-white/15 bg-[rgba(26,15,40,0.55)] text-cream/50 hover:border-gold/40 hover:text-gold-soft'
      }`}
    >
      <SpeakerIcon on={on} />
      {/* Tiny layer dots — a cute readout of the ambience actually breathing */}
      {on && (
        <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-[3px]">
          {readyLayerIds.map((id, i) => (
            <span
              key={id}
              className="h-[3px] w-[3px] rounded-full bg-gold-soft/80"
              style={{ animation: `pivot-pulse 1.6s ease-in-out ${i * 0.18}s infinite` }}
            />
          ))}
        </span>
      )}
      <style>{`
        @keyframes pivot-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </button>
  )
}
