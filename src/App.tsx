import { ShaderHero } from '@/components/ui/shader-hero'
import { TechMarquee } from '@/components/sections/tech-marquee'
import { About } from '@/components/sections/about'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { Resume } from '@/components/sections/resume'
import { Education } from '@/components/sections/education'
import { AskMe } from '@/components/sections/ask-me'
import { Contact } from '@/components/sections/contact'
import { useTheme } from '@/hooks/use-theme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <ShaderHero theme={theme} onToggleTheme={toggleTheme} />
      <TechMarquee />
      <About />
      <Projects />
      <Skills />
      <Resume />
      <Education />
      <AskMe />
      <Contact />
    </main>
  )
}

export default App
