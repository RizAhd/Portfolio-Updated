import { motion } from 'framer-motion';
import { education, experience, techGroups, type Tool } from '@/data/portfolio';
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

/** Experience and education, with the full tech stack underneath. */
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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeader
            title="My tech stack"
            intro={`${toolCount} languages, frameworks and tools I build with, from AI and data to mobile, backend and automation.`}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="w-full max-w-[22rem] justify-self-center sm:max-w-[26rem] lg:max-w-[30rem]"
          >
            <TechOrbit total={toolCount} />
          </motion.div>
        </div>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, i) => (
            <motion.li key={group.category} {...rise(i % 3)} className="rounded-2xl bg-soft p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display-caps text-2xl font-semibold text-ink">{group.category}</h3>
                <span className="text-xs text-muted-ink">{group.tools.length}</span>
              </div>
              <motion.ul
                className="mt-5 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ staggerChildren: 0.045, delayChildren: 0.15 }}
              >
                {group.tools.map((tool) => (
                  <ToolChip key={tool.name} tool={tool} />
                ))}
              </motion.ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);

const chip = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 18 } },
};

/** Pops in with its group; on hover it lifts and its logo does a full turn. */
const ToolChip = ({ tool }: { tool: Tool }) => (
  <motion.li
    variants={chip}
    whileHover={{ y: -3 }}
    className="group flex cursor-default items-center gap-2 rounded-full border border-line bg-page py-1 pr-3 pl-1 text-[13px] text-ink transition-colors hover:border-brand"
  >
    {/* white tile so dark logos (Express, GitHub, Flask) stay visible in the dark theme */}
    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white transition-transform duration-700 group-hover:rotate-[360deg]">
      {tool.icon ? (
        <img src={tool.icon} alt="" loading="lazy" width={16} height={16} className="size-4 object-contain" />
      ) : (
        <span className="text-[9px] font-bold text-[#151413]" aria-hidden="true">
          {tool.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
    {tool.name}
  </motion.li>
);
