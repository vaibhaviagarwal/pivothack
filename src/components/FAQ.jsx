import { useRef, useState } from 'react'
import { useEntrance } from '../hooks/useReveal.js'
import { playChime } from '../lib/chime.js'

const faqs = [
  {
    id: 1,
    q: 'Who can apply?',
    a: 'PIVOT is open to university students, with priority given to University of Waterloo students.',
  },
  {
    id: 2,
    q: 'How do I register?',
    a: 'Hit Apply up top — it&rsquo;ll take you to our Wygo page where you register.',
  },
  {
    id: 3,
    q: 'How are applicants chosen?',
    a: 'On a rolling basis. Spots go out as people apply rather than all at once at a deadline, so applying early gives you a much better shot.',
  },
  {
    id: 4,
    q: 'Do I need a team?',
    a: 'No. We&rsquo;ll set up a Discord as the date gets closer so you can find teammates there, and you can also team up in person on the day. We do ask that everyone comes ready to collaborate &mdash; no solo hacking.',
  },
  {
    id: 5,
    q: 'When is it?',
    a: 'September 13. Hacking runs 8am&ndash;8pm, pitches run until 9pm, then prizes. Give yourself some buffer time around those.',
  },
  {
    id: 6,
    q: 'Is food provided?',
    a: 'Yes!',
  },
  {
    id: 7,
    q: 'How is this fair if every team gets a different challenge?',
    a: 'The first three reveals are the same for every team. The final one, the Pivot card, is different per team &mdash; but every Pivot card is designed to be about the same level of difficulty. They&rsquo;re meant to make you rethink your approach, not make the challenge easier or harder for anyone.',
  },
]

export default function FAQ() {
  const rootRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(-1)
  useEntrance(rootRef, '[data-reveal]', { y: 14 })

  const toggle = (i) =>
    setOpenIndex((prev) => {
      const next = prev === i ? -1 : i
      if (next !== -1) playChime()
      return next
    })

  return (
    <section id="faq" ref={rootRef} className="relative z-10 w-full py-28 sm:py-36">
      <div className="content-container">
        <div className="max-w-[680px]">
          <h2 data-reveal className="section-heading">
            FAQ
          </h2>

          <div data-reveal className="panel-card mt-10 divide-y divide-lavender-light/15">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              const panelId = `faq-panel-${faq.id}`
              const buttonId = `faq-button-${faq.id}`
              return (
                <div key={faq.id}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-inset sm:px-7"
                    >
                      <span className="font-sans text-base font-medium text-cream sm:text-lg">
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 font-sans text-xl font-light text-gold-dim transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="body-text px-6 pb-6 sm:px-7"
                        dangerouslySetInnerHTML={{ __html: faq.a }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
