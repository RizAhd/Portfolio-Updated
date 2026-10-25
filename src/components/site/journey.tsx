import { motion } from 'framer-motion';
import { education, experience, techGroups } from '@/data/portfolio';
import { Container, SectionHeader } from './primitives';
import { EASE } from './motion';
import { TechOrbit } from './tech-orbit';

const milestones = [
  ...experience.map((e) => ({ title: e.role, place: e.company, period: e.period })),
  ...education.map((e) => ({ title: e.qualification, place: e.institution, period: e.period })),
];

const toolCount = techGroups.reduce((n, g) => n + g.tools.length, 0);

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
});

/** Experience and education, with the whole tech stack spinning underneath. */
export const Journey = () => (
  <section id="journey" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeader
        title="Discover my journey"
        intro="From curious builder to software engineer, my path blends formal study with hands-on work in AI and automation."
      />
      <ol className="mt-10">
        {milestones.map((m, i) => (
          <motion.li
            key={m.title}
            {...rise(i)}
            className="flex flex-col gap-2 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <span className="font-display-caps text-[clamp(1.5rem,3vw,2rem)] text-ink">{m.title}</span>
            <span className="shrink-0 sm:text-right">
              <span className="block text-sm font-semibold text-brand">{m.place}</span>
              <span className="block text-xs text-muted-ink">{m.period}</span>
            </span>
          </motion.li>
        ))}
      </ol>

      <div id="stack" className="mt-24 scroll-mt-24 md:mt-32">
        <SectionHeader
          title="My tech stack"
          intro={`${toolCount} languages, frameworks and tools I build with, from AI and data to mobile, backend and automation.`}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mt-8 sm:mt-12"
        >
          <TechOrbit />
        </motion.div>
      </div>
    </Container>
  </section>
);
