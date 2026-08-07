/**
 * Gold petals drifting up the whole page — the ambient layer that ties the
 * reference together. Fixed to the viewport so it reads as one continuous
 * atmosphere rather than restarting per section.
 */

const COUNT = 26

// Deterministic pseudo-random so the layout is stable between renders.
function rand(seed, min, max) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return min + (x - Math.floor(x)) * (max - min)
}

const petals = Array.from({ length: COUNT }, (_, i) => {
  const size = rand(i + 1, 4, 10)
  return {
    id: i,
    left: `${rand(i + 2, 0, 100)}%`,
    size,
    duration: `${rand(i + 3, 16, 34)}s`,
    delay: `${-rand(i + 4, 0, 30)}s`,
    drift: `${rand(i + 5, -120, 160)}px`,
    opacity: rand(i + 6, 0.35, 0.85),
    round: i % 3 === 0,
  }
})

export default function Petals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 block animate-petal bg-gold"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * (p.round ? 1 : 0.5)}px`,
            borderRadius: p.round ? '9999px' : '9999px 2px 9999px 2px',
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            boxShadow: '0 0 8px rgba(224, 182, 74, 0.55)',
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  )
}
