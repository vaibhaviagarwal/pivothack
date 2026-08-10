let ctx

/**
 * Tiny synthesized sparkle — three quick, soft sine notes. No audio file
 * needed, so it can't 404 like the ambient layers did.
 */
export function playChime() {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()

    const now = ctx.currentTime
    const notes = [1318.5, 1568, 2093] // E6, G6, C7

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq

      const start = now + i * 0.06
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.05, start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55)

      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.6)
    })
  } catch {}
}
