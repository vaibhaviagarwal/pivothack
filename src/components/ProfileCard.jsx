/**
 * One profile-card system, shared by Judges and Team: a small illustrated
 * card with an arched-window portrait and a badge-style LinkedIn pin. Every
 * card is a fixed pixel size (set on .arch-card / .arch-photo-outer in
 * index.css) so cards never grow or shrink based on their own or a
 * neighbour's text length — a two-line role can't make one card taller or
 * wider than the rest. Judges and Team share the same card; the accent
 * tone is what tells them apart.
 */
function LinkedInIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export default function ProfileCard({ name, role, photo, linkedin, variant = 'team' }) {
  const isJudge = variant === 'judge'
  const accent = isJudge ? 'border-gold/45' : 'border-[#cf9f4a]/55'

  return (
    <div className="profile-card">
      <div className="arch-card">
        <div className={`arch-photo-outer ${accent}`}>
          <div className="arch-photo-inner">
            {photo ? (
              <img
                src={photo}
                alt={name}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-cream/25">
                <span className="font-display text-2xl">?</span>
              </div>
            )}
          </div>

          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="arch-badge"
            >
              <LinkedInIcon />
            </a>
          )}
        </div>

        <div className="frame-divider mt-3" />

        <div className="frame-nameplate">
          <h3 className="font-display text-base font-normal text-cream sm:text-[1.05rem]">{name}</h3>
          {role && (
            <p className="mt-1 text-center text-[0.7rem] font-medium uppercase tracking-wide text-gold-dim sm:text-xs">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
