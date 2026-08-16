import aboutImg from './assets/img/about.jpg'
import sponsorsImg from './assets/img/sponsors.jpg'

import judgesMp4 from './assets/video/judges.mp4'
import judgesWebm from './assets/video/judges.webm'
import judgesPoster from './assets/video/judges-poster.jpg'

import heroMp4 from './assets/video/hero.mp4'
import heroWebm from './assets/video/hero.webm'
import heroPoster from './assets/video/hero-poster.jpg'

import streamMp4 from './assets/video/stream.mp4'
import streamWebm from './assets/video/stream.webm'
import streamPoster from './assets/video/stream-poster.jpg'

import caveMp4 from './assets/video/cave.mp4'
import caveWebm from './assets/video/cave.webm'
import cavePoster from './assets/video/cave-poster.jpg'

import faqMp4 from './assets/video/faq.mp4'
import faqWebm from './assets/video/faq.webm'
import faqPoster from './assets/video/faq-poster.jpg'

/**
 * One ordered list drives both the nav and the backdrop world.
 *
 * `scrim` is how much darkness sits over that scene — brighter art needs more
 * so the cream text keeps its contrast.
 */
export const scenes = [
  {
    id: 'hero',
    label: 'Home',
    type: 'video',
    mp4: heroMp4,
    webm: heroWebm,
    poster: heroPoster,
    alt: 'A clocktower drifting above moonlit clouds',
    scrim: 0.2,
  },
  {
    id: 'about',
    label: 'About',
    type: 'image',
    src: aboutImg,
    alt: 'A glowing golden tree above a rolling lavender meadow',
    scrim: 0.3,
  },
  {
    id: 'schedule',
    label: 'Schedule',
    type: 'video',
    mp4: streamMp4,
    webm: streamWebm,
    poster: streamPoster,
    alt: 'A golden waterfall falling into a lantern-lit plunge pool',
    scrim: 0.28,
    // The Stream draws a path over the real river, so this scene must not
    // drift — any scale/pan here would slide the water out from under it.
    noDrift: true,
  },
  {
    id: 'judges',
    label: 'Judges',
    type: 'video',
    mp4: judgesMp4,
    webm: judgesWebm,
    poster: judgesPoster,
    alt: 'Swans drifting on a golden stream in a lantern-lit forest glade',
    scrim: 0.28,
  },
  {
    id: 'team',
    label: 'Team',
    type: 'video',
    mp4: caveMp4,
    webm: caveWebm,
    poster: cavePoster,
    alt: 'A glowing crystal cave with an amber path winding into the distance',
    scrim: 0.26,
  },
  {
    id: 'sponsors',
    label: 'Sponsors & Prizes',
    type: 'image',
    src: sponsorsImg,
    alt: 'A night market of wooden stalls strung with glowing paper lanterns',
    scrim: 0.32,
  },
  {
    id: 'faq',
    label: 'Questions',
    type: 'video',
    mp4: faqMp4,
    webm: faqWebm,
    poster: faqPoster,
    alt: 'A village nestled in a lavender and gold cloudscape at dusk',
    scrim: 0.3,
  },
]

export const sections = scenes.map(({ id, label }) => ({ id, label }))
