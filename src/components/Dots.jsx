import { sections } from '../sections.js'
import { useLenis } from '../lib/smoothScroll.jsx'

export default function Dots({ activeId }) {
  const lenisRef = useLenis()

  const handleClick = (e, id) => {
    e.preventDefault()
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.4, offset: -96 })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => handleClick(e, s.id)}
          aria-label={s.label}
          className={`block h-2 w-2 rounded-full transition-all duration-300 ${
            activeId === s.id ? 'scale-125 bg-gold shadow-glow' : 'bg-white/25 hover:bg-white/50'
          }`}
        />
      ))}
    </div>
  )
}
