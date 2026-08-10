import { useRef, useState } from 'react'
import { useScrubReveal, useSectionExit } from '../hooks/useReveal.js'
import { playChime } from '../lib/chime.js'

// Placeholders. Swap `q` for the real question and fill `a` when the copy lands.
const faqs = [
  { id: 1, q: 'Q1', a: '' },
  { id: 2, q: 'Q2', a: '' },
  { id: 3, q: 'Q3', a: '' },
]

export default function FAQ() {
  const rootRef = useRef(null)
  // All closed while the answers are still empty — an open, blank panel reads as broken.
  const [openIndex, setOpenIndex] = useState(-1)
  useScrubReveal(rootRef, '[data-reveal]', { start: 'top 82%', end: 'center 55%', stagger: 0.1 })
  useSectionExit(rootRef)

  const toggle = (i) =>
    setOpenIndex((prev) => {
      const next = prev === i ? -1 : i
      if (next !== -1) playChime()
      return next
    })

  return (
    <section
      id="faq"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-32"
    >
      <div data-veil className="w-full max-w-2xl">
        <div data-reveal className="mb-14 text-center">
          <h2 className="section-heading">Questions</h2>
          <p className="eyebrow">Coming Soon</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={faq.id}
                data-reveal
                className={`panel-card overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'border-gold/30' : ''
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
                >
                  <span className="font-display text-lg font-normal text-cream sm:text-xl">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 font-sans text-lg font-light text-gold-dim transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 font-sans text-sm font-light leading-relaxed text-cream/60 sm:px-7">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
