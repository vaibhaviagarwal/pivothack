import { useRef } from 'react'
import { useEntrance } from '../hooks/useReveal.js'
import ProfileCard from './ProfileCard.jsx'
import simonImg from '../assets/img/judges/simon.jpg'
import rajiImg from '../assets/img/judges/raji.jpg'
import osherImg from '../assets/img/judges/osher.jpg'
import alanImg from '../assets/img/judges/alan.jpg'
import anirudhImg from '../assets/img/judges/anirudh.png'

const judges = [
  {
    id: 1,
    name: 'Simon Ryu',
    role: 'Cresta',
    photo: simonImg,
    linkedin: 'https://www.linkedin.com/in/simon-ryu-vancouver/',
  },
  {
    id: 2,
    name: 'Raji RV',
    role: 'IBM',
    photo: rajiImg,
    linkedin: 'https://www.linkedin.com/in/raji-rv/',
  },
  {
    id: 3,
    name: 'Osher Ahn Clifford',
    role: 'ex Shopify, Cohere & Wealthsimple',
    photo: osherImg,
    linkedin: 'https://www.linkedin.com/in/osherac/',
  },
  {
    id: 4,
    name: 'Alan Zhang',
    role: 'BuildBane, BMO',
    photo: alanImg,
    linkedin: 'https://www.linkedin.com/in/alan-zhang-7b2662251/',
  },
  {
    id: 5,
    name: 'Anirudh Dabas',
    role: 'Shopify, Waddleloo',
    photo: anirudhImg,
    linkedin: 'https://www.linkedin.com/in/anirudhdabas/',
  },
]

export default function Judges() {
  const rootRef = useRef(null)
  useEntrance(rootRef, '[data-reveal]', { y: 16, stagger: 0.08 })

  return (
    <section id="judges" ref={rootRef} className="relative z-10 w-full py-24 sm:py-28">
      <div className="content-container">
        <h2 data-reveal className="section-heading">
          Judges
        </h2>

        <div
          data-reveal
          className="mx-auto mt-10 flex max-w-[820px] flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-x-12 sm:gap-y-10"
        >
          {judges.map((judge) => (
            <ProfileCard
              key={judge.id}
              name={judge.name}
              role={judge.role}
              photo={judge.photo}
              linkedin={judge.linkedin}
              variant="judge"
            />
          ))}
        </div>

        <p data-reveal className="supporting-text mt-8 text-center">
          More judges will be announced soon.
        </p>
      </div>
    </section>
  )
}
