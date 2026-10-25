import { motion } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';
import type { ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { EASE } from './motion';
import { PortraitCard } from './portrait';

const SIZE = 'text-[clamp(4rem,10.5vw,9.5rem)]';

/**
 * Each headline line rises out of its own mask. The mask is a full 1em tall so round
 * letters keep their overshoot (a shorter one shaved the bottoms of S, O and G);
 * lines after the first tuck up into the empty space above the caps instead.
 */
const Line = ({ children, delay, first = false }: { children: ReactNode; delay: number; first?: boolean }) => (
  <span
    className={`block overflow-hidden font-display-caps font-bold ${SIZE} ${first ? '' : '-mt-[0.07em]'}`}
    style={{ lineHeight: 1 }}
  >
    <motion.span
      className="block"
      initial={{ y: '105%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const Hero = () => (
  <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
    <div className="mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
      <div className="relative z-10">
        <motion.p {...fade(0.1)} className="flex items-center gap-3 font-display-caps text-2xl font-semibold text-ink sm:text-3xl">
          <span className="h-px w-10 bg-brand" aria-hidden="true" />
          {profile.name}
        </motion.p>

        <h1 className="mt-5 text-ink" aria-label={`${profile.name}, Software and AI Engineer`}>
          <Line delay={0.2} first>
            Software
          </Line>
          <Line delay={0.32}>
            <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">+</span>{' '}
            <span className="text-brand">AI</span>
          </Line>
          <Line delay={0.44}>Engineer</Line>
        </h1>

        <motion.p {...fade(0.75)} className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
          I build scalable, data-driven applications and intelligent AI products, from idea to production.
        </motion.p>

        <motion.div {...fade(0.9)} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-inverse px-6 text-sm font-medium text-inverse-ink transition-transform hover:-translate-y-0.5"
          >
            View my work
            <ArrowDownRight className="size-4" />
          </a>
          <a
            href="/Riflan_Mohamed_CV_AI_Engineer.pdf"
            download="Riflan_Mohamed_CV_AI_Engineer.pdf"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Portrait slot: the card itself on phones and tablets; on desktop the pinned card in PortraitStage sits here. */}
      <div data-portrait-anchor className="mx-auto w-[min(74vw,20rem)] lg:mx-0 lg:w-[clamp(17rem,25vw,22rem)]">
        <div className="lg:invisible">
          <PortraitCard />
        </div>
      </div>
    </div>
  </section>
);
