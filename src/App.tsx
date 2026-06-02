import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { ShaderHero } from '@/components/ui/shader-hero'
import { TechMarquee } from '@/components/sections/tech-marquee'
import { About } from '@/components/sections/about'
import { useTheme } from '@/hooks/use-theme'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

const Projects = lazy(() =>
  import('@/components/sections/projects').then((m) => ({ default: m.Projects }))
)
const Skills = lazy(() =>
  import('@/components/sections/skills').then((m) => ({ default: m.Skills }))
)
const Resume = lazy(() =>
  import('@/components/sections/resume').then((m) => ({ default: m.Resume }))
)
const Education = lazy(() =>
  import('@/components/sections/education').then((m) => ({ default: m.Education }))
)
const AskMe = lazy(() =>
  import('@/components/sections/ask-me').then((m) => ({ default: m.AskMe }))
)
const Contact = lazy(() =>
  import('@/components/sections/contact').then((m) => ({ default: m.Contact }))
)

const SectionFallback = () => <div aria-hidden className="min-h-screen w-full" />

function App() {
  const { theme, toggleTheme } = useTheme()
  useSmoothScroll()

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground antialiased">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <ShaderHero theme={theme} />
      <TechMarquee />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <Projects />
        <Skills />
        <Resume />
        <Education />
        <AskMe />
        <Contact />
      </Suspense>
    </main>
  )
}

export default App
