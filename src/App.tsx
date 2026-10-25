import { MotionConfig } from 'framer-motion'
import { About } from '@/components/site/about'
import { Certifications } from '@/components/site/certifications'
import { Contact } from '@/components/site/contact'
import { Faq } from '@/components/site/faq'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { Journey } from '@/components/site/journey'
import { Nav } from '@/components/site/nav'
import { PortraitStage } from '@/components/site/portrait'
import { Process } from '@/components/site/process'
import { Projects } from '@/components/site/projects'
import { Services } from '@/components/site/services'
import { ThemeSwitch } from '@/components/site/theme-switch'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { useTheme } from '@/hooks/use-theme'

function App() {
  const { theme, toggleTheme } = useTheme()
  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main className="relative z-10 overflow-x-clip">
        {/* the portrait stays pinned beside these three, as in the original layout */}
        <PortraitStage>
          <Hero />
          <Services />
          <About />
        </PortraitStage>
        <Projects />
        <Certifications />
        <Journey />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ThemeSwitch theme={theme} onToggle={toggleTheme} />
    </MotionConfig>
  )
}

export default App
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
