import { useEffect, useState } from 'react'
import { useLenis } from '../lib/smoothScroll.jsx'

// Judges and Team share one nav entry ("People") since they're one idea
// split across two sections — the rest map 1:1 to a section id.
const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'judges', label: 'People', match: ['judges', 'team'] },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'faq', label: 'FAQ' },
]

export default function Nav({ activeId }) {
  const lenisRef = useLenis()
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // The hero stays completely clean — the bar only appears once you've
  // scrolled past it.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.4, offset: -96 })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (link) => (link.match ?? [link.id]).includes(activeId)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        visible
          ? 'translate-y-0 border-gold/20 bg-[rgba(48,26,58,0.72)] opacity-100 backdrop-blur-sm'
          : '-translate-y-full border-transparent opacity-0'
      }`}
    >
      <div className="content-container flex h-[var(--nav-h)] items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, 'hero')}
          className="rounded-md font-display text-lg font-normal text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          PIVOT
        </a>

        <nav className="hidden gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              aria-current={isActive(link) ? 'true' : undefined}
              className={`nav-link ${isActive(link) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wygo.world/pivot"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn-sm hidden sm:inline-flex"
          >
            Apply
          </a>

          {/* Mobile menu toggle — links collapse into this below md. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-md text-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-gold/15 bg-[rgba(48,26,58,0.92)] px-6 pb-6 pt-2 md:hidden"
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                aria-current={isActive(link) ? 'true' : undefined}
                className={`rounded-md px-2 py-3 font-sans text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                  isActive(link) ? 'text-gold-soft' : 'text-cream/75'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wygo.world/pivot"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn mt-3 w-full"
            >
              Apply
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
