import { useLenis } from '../lib/smoothScroll.jsx'

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  )
}

const socials = [
  { label: 'Email', href: 'mailto:vagarwal2077@gmail.com', Icon: MailIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pivot-hacks/posts/?feedView=all',
    Icon: LinkedInIcon,
  },
  { label: 'Instagram', href: 'https://www.instagram.com/pivothack/', Icon: InstagramIcon },
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
            <p className="mt-2 max-w-[220px] font-sans text-sm font-light leading-relaxed text-cream/70">
              Builders Club
              <br />
              165 King St W
              <br />
              Kitchener, ON N2G 1A7
            </p>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex gap-5 pt-1 text-cream/40">
              {socials.map(({ label, href, Icon }) => {
                const isMailto = href.startsWith('mailto:')
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={isMailto ? undefined : '_blank'}
                    rel={isMailto ? undefined : 'noreferrer'}
                    className="transition-colors hover:text-gold-soft"
                  >
                    <Icon />
                  </a>
                )
              })}
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
