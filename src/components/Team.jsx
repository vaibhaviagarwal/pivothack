import { useRef } from 'react'
import { useScrubReveal, useSectionExit } from '../hooks/useReveal.js'
import OrnateFrame from './OrnateFrame.jsx'
import vaibhaviImg from '../assets/img/team/vaibhavi.jpg'
import peterImg from '../assets/img/team/peter.jpg'
import ritaImg from '../assets/img/team/rita.jpg'
import vibhorImg from '../assets/img/team/vibhor.jpg'
import vivImg from '../assets/img/team/viv.jpg'

const team = [
  {
    id: 1,
    name: 'Vaibhavi Agarwal',
    role: 'Co-Founder · Honours Math',
    photo: vaibhaviImg,
  },
  { id: 2, name: 'Rita Bhowmik', role: 'Co-Founder · Nanotechnology Engineering', photo: ritaImg },
  { id: 3, name: 'Peter Lian', role: 'Co-Organizer · Computer Science', photo: peterImg },
  { id: 4, name: 'Vibhor Sharma', role: 'Co-Organizer · Management Engineering', photo: vibhorImg },
  { id: 5, name: 'Vivian Yang', role: 'Co-Organizer · Computer Science', photo: vivImg },
]

function PortraitFrame({ person }) {
  return (
    <div data-reveal className="group flex w-44 flex-col items-center text-center sm:w-48">
      <div className="relative aspect-[200/260] w-full">
        {/* Portrait plate, inset so the filigree sits proud of the image */}
        <div className="absolute inset-[7%] overflow-hidden rounded-[2px] bg-[rgba(42,26,58,0.75)]">
          {person.photo ? (
            <img
              src={person.photo}
              alt={person.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-2xl font-normal text-gold-soft/50">?</span>
            </div>
          )}
          {/* Keeps the portrait sitting in the same world as the cave behind it */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight-deep/55 via-transparent to-transparent" />
        </div>

        <OrnateFrame className="transition-opacity duration-300 group-hover:opacity-100 opacity-90" />
      </div>

      <h3 className="mt-5 font-display text-base font-normal leading-tight text-cream">
        {person.name}
      </h3>
      <p className="micro-label mt-1.5 leading-relaxed">{person.role}</p>
    </div>
  )
}

export default function Team() {
  const rootRef = useRef(null)
  useScrubReveal(rootRef, '[data-reveal]', { start: 'top 80%', end: 'center 55%', stagger: 0.12 })
  useSectionExit(rootRef)

  return (
    <section
      id="team"
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-32"
    >
      <div data-veil className="w-full max-w-6xl">
        <div data-reveal className="mb-14 text-center">
          <h2 className="section-heading">Team</h2>
          <p className="eyebrow">Coming Soon</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12">
          {team.map((person) => (
            <PortraitFrame key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  )
}
