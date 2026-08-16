import { useLenis } from '../lib/smoothScroll.jsx'

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 5.8c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 11.7 8c0 .3 0 .6.1.9A11.7 11.7 0 0 1 3.2 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.6 0 11.7-6.3 11.7-11.7v-.6c.8-.6 1.5-1.3 2-2.2Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// TODO: point these at the real accounts once they exist. A dead "#" href
// is worse than no link at all, so nothing renders until there's a real URL.
const socials = [
  { label: 'GitHub', href: 'https://github.com', Icon: GithubIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
]

export default function Footer() {
  const lenisRef = useLenis()

  const backToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.6 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative z-10 w-full bg-midnight-soft px-6 pb-12 pt-32">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-midnight-soft" />

      <div className="relative z-20 mx-auto w-full max-w-5xl">
        <div className="h-px w-full bg-lavender-light/15" />

        <div className="mt-12 flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <h2 className="font-display text-2xl font-normal text-cream">PIVOT</h2>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/45">
              A 12-hour hackathon where the challenge changes as you build.
            </p>
          </div>

          <div>
            <p className="supporting-text">Location</p>
            <p className="mt-2 font-sans text-sm font-light text-cream/70">Waterloo, ON</p>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex gap-5 pt-1 text-cream/40">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gold-soft"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <button
              onClick={backToTop}
              aria-label="Back to top"
              className="group flex h-14 w-14 flex-col items-center justify-center rounded-xl border border-gold/20 bg-[rgba(48,26,58,0.6)] text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:text-gold-soft"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 19V5M12 5L5 12M12 5l7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-1 font-sans text-[11px]">Top</span>
            </button>
          </div>
        </div>

        <p className="mt-16 text-center font-sans text-xs text-cream/30">&copy; 2026 PIVOT</p>
      </div>
    </footer>
  )
}
