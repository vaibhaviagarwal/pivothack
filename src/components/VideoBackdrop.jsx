import { useEffect, useRef } from 'react'

/**
 * Full-bleed looping video background with a dark scrim + top/bottom fades,
 * so section content stays readable over moving art.
 *
 * Pauses itself when scrolled out of view (saves battery / decode work) and
 * falls back to the poster frame when the user prefers reduced motion.
 */
export default function VideoBackdrop({
  mp4,
  webm,
  poster,
  label,
  scrim = 'bg-midnight-deep/55',
  fade = true,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      video.pause()
      return
    }

    // Only decode while the section is anywhere near the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const play = video.play()
          if (play && typeof play.catch === 'function') play.catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={mp4} type="video/mp4" />
      </video>

      {/* Dark scrim so cream text holds up over the brighter frames */}
      <div className={`absolute inset-0 ${scrim}`} />

      {/* Vignette — pulls the eye to the centre the way the reference does */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,4,20,0) 35%, rgba(10,4,20,0.55) 100%)',
        }}
      />

      {fade && (
        <>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-midnight-deep to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight-deep to-transparent" />
        </>
      )}
    </div>
  )
}
