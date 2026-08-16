import { useEffect, useState } from 'react'
import { sections } from '../scenes.js'
import { useLenis } from '../lib/smoothScroll.jsx'

export default function Nav({ activeId }) {
  const lenisRef = useLenis()
  const [visible, setVisible] = useState(false)

  // The reference keeps the hero completely clean — the bar only appears
  // once you've scrolled past it.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.4 })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-[var(--nav-h)] items-center justify-between border-b px-6 transition-all duration-500 sm:px-10 ${
        visible
          ? 'translate-y-0 border-white/[0.07] bg-[rgba(10,4,20,0.72)] opacity-100 backdrop-blur-lg'
          : '-translate-y-full border-transparent opacity-0'
      }`}
    >
      <a
        href="#hero"
        onClick={(e) => handleClick(e, 'hero')}
        className="font-display text-base font-normal tracking-widest3 text-cream"
      >
        PIVOT
      </a>

      <nav className="hidden gap-8 md:flex">
        {sections.slice(1).map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleClick(e, s.id)}
            className={`font-sans text-[10px] font-medium uppercase tracking-widest2 transition-colors ${
              activeId === s.id ? 'text-gold' : 'text-cream/45 hover:text-cream'
            }`}
          >
            {s.label}
          </a>
        ))}
      </nav>

      <a
        href="https://wygo.world/pivot"
        target="_blank"
        rel="noopener noreferrer"
        className="pill-btn-sm hidden sm:inline-flex"
      >
        Apply
      </a>
    </header>
  )
}
