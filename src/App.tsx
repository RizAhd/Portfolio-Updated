import { lazy, Suspense } from 'react'
import { ArrowDown } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { CursorPixelTrail } from '@/components/ui/cursor-pixel-trail'
import { PromptingIsAllYouNeed } from '@/components/ui/animated-hero-section'
import { TechMarquee } from '@/components/sections/tech-marquee'
import { About } from '@/components/sections/about'
import { useTheme } from '@/hooks/use-theme'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

const Projects = lazy(() =>
  import('@/components/sections/projects').then((m) => ({ default: m.Projects }))
)
const Quote = lazy(() =>
  import('@/components/sections/quote').then((m) => ({ default: m.Quote }))
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
      <CursorPixelTrail />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-black"
      >
        <PromptingIsAllYouNeed line1="RIFLAN" line2="MOHAMED" />
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
        >
          Scroll
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>
      <TechMarquee />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <Projects />
        <Quote />
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
