import { motion } from 'framer-motion';
import { education, experience, techStack } from '@/data/portfolio';
import { Container, SectionHeader } from './primitives';
import { EASE } from './motion';

const milestones = [
  ...experience.map((e) => ({ title: e.role, place: e.company, period: e.period })),
  ...education.map((e) => ({ title: e.qualification, place: e.institution, period: e.period })),
];

const rowMotion = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
});

export const Journey = () => (
  <section id="journey" className="scroll-mt-24 py-24 md:py-32">
    <Container className="grid gap-20 md:grid-cols-2 md:gap-16">
      <div>
        <SectionHeader
          title="Discover my journey"
          intro="From curious builder to software engineer — my path blends formal study with hands-on work in AI and automation."
        />
        <ol className="mt-10">
          {milestones.map((m, i) => (
            <motion.li
              key={m.title}
              {...rowMotion(i)}
              className="flex flex-col gap-2 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="font-display-caps text-[1.6rem] text-ink">{m.title}</span>
              <span className="shrink-0 sm:text-right">
                <span className="block text-sm font-semibold text-brand">{m.place}</span>
                <span className="block text-xs text-muted-ink">{m.period}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div>
        <SectionHeader
          title="My tech stack"
          intro="I build with intention — each tool here earns its place in the projects I ship."
        />
        <ul className="mt-10">
          {techStack.map((tool, i) => (
            <motion.li key={tool.name} {...rowMotion(i)} className="flex items-start gap-4 border-b border-line py-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white p-2.5 shadow-sm">
                <img src={tool.icon} alt="" className="size-full object-contain" loading="lazy" width={24} height={24} />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink">{tool.name}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{tool.note}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);
