import { useRef } from 'react'
import { useEntrance } from '../hooks/useReveal.js'
import ProfileCard from './ProfileCard.jsx'
import vaibhaviImg from '../assets/img/team/vaibhavi.jpg'
import peterImg from '../assets/img/team/peter.jpg'
import ritaImg from '../assets/img/team/rita.jpg'
import vibhorImg from '../assets/img/team/vibhor.jpg'
import vivImg from '../assets/img/team/viv.jpg'

// Two tiers, no repeated "Co-Founder ·" / "Co-Organizer ·" prefix on each
// card — that's now said once via the tier banner instead.
const founders = [
  {
    id: 1,
    name: 'Vaibhavi Agarwal',
    role: 'Mathematics',
    photo: vaibhaviImg,
    linkedin: 'https://www.linkedin.com/in/vaibhavi-agarwal-28b6481b3/',
  },
  {
    id: 2,
    name: 'Rita Bhowmik',
    role: 'Nanotechnology Engineering',
    photo: ritaImg,
    linkedin: 'https://www.linkedin.com/in/ritabhowmik/',
  },
]

const organizers = [
  {
    id: 3,
    name: 'Peter Lian',
    role: 'Computer Science',
    photo: peterImg,
    linkedin: 'https://www.linkedin.com/in/yishuolian/',
  },
  {
    id: 4,
    name: 'Vibhor Sharma',
    role: 'Management Engineering',
    photo: vibhorImg,
    linkedin: 'https://www.linkedin.com/in/vibhor-sharma--/',
  },
  {
    id: 5,
    name: 'Vivian Yang',
    role: 'Computer Science',
    photo: vivImg,
    linkedin: 'https://www.linkedin.com/in/vivian-yang-2ab528232/',
  },
]

// Cards are a fixed 148/160px wide (see .arch-card). A max-width here keeps
// the row itself no wider than its cards actually need, so justify-center
// clusters them tightly instead of spreading across the whole content
// column when there are only two or three of them.
function Tier({ label, people, className = '' }) {
  return (
    <div data-reveal className={className}>
      <div className="flex justify-center">
        <span className="tier-banner">{label}</span>
      </div>
      <div className="mx-auto mt-5 flex max-w-[640px] flex-wrap justify-center gap-x-12 gap-y-10">
        {people.map((person) => (
          <ProfileCard
            key={person.id}
            name={person.name}
            role={person.role}
            photo={person.photo}
            linkedin={person.linkedin}
            variant="team"
          />
        ))}
      </div>
    </div>
  )
}

export default function Team() {
  const rootRef = useRef(null)
  useEntrance(rootRef, '[data-reveal]', { y: 16, stagger: 0.08 })

  return (
    <section id="team" ref={rootRef} className="relative z-10 w-full py-24 sm:py-28">
      <div className="content-container">
        <h2 data-reveal className="section-heading">
          Team
        </h2>

        <div className="mt-10 flex flex-col gap-8">
          <Tier label="Co-Founders" people={founders} />
          <Tier label="Co-Organizers" people={organizers} />
        </div>
      </div>
    </section>
  )
}
