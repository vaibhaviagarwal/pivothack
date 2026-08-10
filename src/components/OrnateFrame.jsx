/**
 * Ornate portrait frame — filigree scrollwork, jewelled pips, double gold rule.
 *
 * Drawn as SVG rather than a bitmap so it stays crisp at any size and picks up
 * the site's gold/amethyst palette instead of a stock frame's colours.
 *
 * The viewBox is 200x260; one corner motif is authored and then mirrored into
 * the other three, which keeps the path data small and perfectly symmetrical.
 */

const CORNER = 'M 6,44 C 6,22 22,6 44,6 M 12,44 C 12,26 26,12 44,12'
const FLOURISH =
  'M 16,40 C 22,40 26,34 26,28 C 26,23 22,20 19,22 C 16,24 17,29 22,29 C 28,29 32,24 33,17 M 33,17 C 34,13 38,11 42,12'

function Jewel({ x, y, r = 3.6 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(45)`}>
      <rect x={-r} y={-r} width={r * 2} height={r * 2} rx="0.8" fill="url(#jewelFill)" />
      <rect
        x={-r}
        y={-r}
        width={r * 2}
        height={r * 2}
        rx="0.8"
        fill="none"
        stroke="#f0d488"
        strokeWidth="0.7"
      />
      <path d={`M ${-r},0 L 0,${-r} L ${r},0 L 0,${r} Z`} fill="none" stroke="#fff" strokeWidth="0.35" opacity="0.55" />
    </g>
  )
}

export default function OrnateFrame({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 260"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldRule" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d488" />
          <stop offset="45%" stopColor="#e0b64a" />
          <stop offset="100%" stopColor="#b8892b" />
        </linearGradient>
        <radialGradient id="jewelFill" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#f6e6ff" />
          <stop offset="55%" stopColor="#b9a6e0" />
          <stop offset="100%" stopColor="#7c5cff" />
        </radialGradient>
        <filter id="frameGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <g id="cornerMotif">
          <path d={CORNER} fill="none" stroke="url(#goldRule)" strokeWidth="1.6" strokeLinecap="round" />
          <path d={FLOURISH} fill="none" stroke="url(#goldRule)" strokeWidth="1.2" strokeLinecap="round" />
          <Jewel x={20} y={20} r={4.2} />
        </g>
      </defs>

      <g filter="url(#frameGlow)">
        {/* Double rule */}
        <rect x="6" y="6" width="188" height="248" rx="3" fill="none" stroke="url(#goldRule)" strokeWidth="1.6" />
        <rect x="12" y="12" width="176" height="236" rx="2" fill="none" stroke="url(#goldRule)" strokeWidth="0.8" opacity="0.75" />

        {/* Corners, mirrored from a single motif */}
        <use href="#cornerMotif" />
        <use href="#cornerMotif" transform="translate(200 0) scale(-1 1)" />
        <use href="#cornerMotif" transform="translate(0 260) scale(1 -1)" />
        <use href="#cornerMotif" transform="translate(200 260) scale(-1 -1)" />

        {/* Jewels at the midpoints */}
        <Jewel x={100} y={9} />
        <Jewel x={100} y={251} />
        <Jewel x={9} y={130} />
        <Jewel x={191} y={130} />

        {/* Small crest above and below */}
        <path d="M 88,9 L 100,2 L 112,9" fill="none" stroke="url(#goldRule)" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M 88,251 L 100,258 L 112,251" fill="none" stroke="url(#goldRule)" strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </svg>
  )
}
