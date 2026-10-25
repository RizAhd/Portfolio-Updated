import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio';
import { HiBadge } from './primitives';
import { EASE } from './motion';

const WORD = 'font-display-caps text-[clamp(3.5rem,9vw,8.75rem)] font-bold leading-[0.85] text-ink';

export const Hero = () => (
  <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 pb-24">
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-5 md:flex-row md:items-start md:justify-center md:gap-6 lg:gap-8">
      {/* Left word */}
      <motion.div
        className="order-2 flex flex-col items-center md:order-1 md:items-start md:pt-[clamp(5rem,10vw,9rem)]"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: EASE }}
      >
        <p className="font-display-caps text-2xl font-semibold text-ink sm:text-3xl md:mb-3">{profile.name}</p>
        <h1 className="sr-only">
          {profile.name} — {profile.title}
        </h1>
        <span aria-hidden="true" className={`${WORD} hidden md:block`}>
          Software
        </span>
      </motion.div>

      {/* Portrait */}
      <motion.div
        className="relative order-1 w-[min(72vw,20rem)] shrink-0 md:order-2 md:w-[clamp(15rem,23vw,21.25rem)]"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="aspect-[5/7] overflow-hidden rounded-2xl bg-soft shadow-2xl shadow-black/15">
          <img
            src="/riflan-portrait.webp"
            alt={`Portrait of ${profile.name}`}
            className="size-full object-cover object-[50%_22%]"
            width={716}
            height={1280}
            fetchPriority="high"
          />
        </div>
        <HiBadge className="-bottom-8 -left-8 sm:-bottom-10 sm:-left-16" />
      </motion.div>

      {/* Right word */}
      <motion.div
        className="order-3 flex flex-col items-center text-center md:items-end md:pt-[clamp(5rem,10vw,9rem)] md:text-right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: EASE }}
      >
        {/* invisible twin of the name label, so both words share a baseline */}
        <p aria-hidden="true" className="invisible mb-3 hidden font-display-caps text-3xl font-semibold md:block">
          {profile.name}
        </p>
        <span aria-hidden="true" className={`${WORD} md:hidden`}>
          Software
        </span>
        <span aria-hidden="true" className={WORD}>
          Engineer
        </span>
        <p className="mt-4 max-w-[19rem] text-base leading-snug text-ink-soft sm:text-lg">
          I&apos;m a {profile.location}–based software engineer and AI developer.
        </p>
      </motion.div>
    </div>
  </section>
);
