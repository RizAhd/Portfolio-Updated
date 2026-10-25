import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio';
import { EASE } from './motion';
import { PortraitCard } from './portrait';

const WORD = 'font-display-caps text-[clamp(3.5rem,9vw,8.75rem)] font-bold leading-[0.92] text-ink lg:leading-[0.85]';
const NAME = 'font-display-caps text-2xl font-semibold text-ink sm:text-3xl';

/** The two words start tucked in against the card and slide outward as they appear. */
const slide = (from: number, delay: number) => ({
  initial: { opacity: 0, x: from },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.4, delay, ease: EASE },
});

export const Hero = () => (
  <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 pb-24">
    <h1 className="sr-only">
      {profile.name} — Software Engineer & AI Engineer
    </h1>
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-5 lg:flex-row lg:items-start lg:justify-center lg:gap-6 lg:gap-8">
      {/* Left word */}
      <motion.div
        className="relative z-10 order-2 flex flex-col items-center lg:order-1 lg:items-start lg:pt-[clamp(5rem,10vw,9rem)]"
        {...slide(160, 0.55)}
      >
        <p className={`${NAME} lg:mb-3`}>{profile.name}</p>
        <span aria-hidden="true" className={`${WORD} hidden lg:block`}>
          Software
        </span>
      </motion.div>

      {/* Portrait slot: the card itself on phones; on desktop the pinned card in PortraitStage sits here. */}
      <div data-portrait-anchor className="order-1 w-[min(72vw,20rem)] shrink-0 lg:order-2 lg:w-[clamp(15rem,23vw,21.25rem)]">
        <div className="lg:invisible">
          <PortraitCard />
        </div>
      </div>

      {/* Right word */}
      <motion.div
        className="relative z-10 order-3 flex flex-col items-center text-center lg:items-end lg:pt-[clamp(5rem,10vw,9rem)] lg:text-right"
        {...slide(-160, 0.65)}
      >
        {/* invisible twin of the name label, so both words share a baseline */}
        <p aria-hidden="true" className={`${NAME} invisible mb-3 hidden lg:block`}>
          {profile.name}
        </p>
        <span aria-hidden="true" className={`${WORD} lg:hidden`}>
          Software
        </span>
        <span aria-hidden="true" className={WORD}>
          Engineer
        </span>
        <p className="mt-4 max-w-[19rem] text-base leading-snug text-ink-soft sm:text-lg">
          I&apos;m a software engineer and AI engineer.
        </p>
      </motion.div>
    </div>
  </section>
);
