import { sections } from './scenes.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import SceneStage from './components/SceneStage.jsx'
import Nav from './components/Nav.jsx'
import Petals from './components/Petals.jsx'
import AmbientAudio from './components/AmbientAudio.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Schedule from './components/Schedule.jsx'
import Judges from './components/Judges.jsx'
import Team from './components/Team.jsx'
import Sponsors from './components/Sponsors.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

const sectionIds = sections.map((s) => s.id)

export default function App() {
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <SceneStage />
      <Petals />
      <Nav activeId={activeId} />
      <AmbientAudio activeId={activeId} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Schedule />
        <Judges />
        <Team />
        <Sponsors />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
