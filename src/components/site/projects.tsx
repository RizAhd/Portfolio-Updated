import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState, type PointerEvent } from 'react';
import { GithubIcon } from '@/components/brand-icons';
import { projects, type Project } from '@/data/portfolio';
import { Container, PillButton, SectionHeader, Tag } from './primitives';
import { EASE } from './motion';

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

/** Each featured card gets its own colour field in place of a cover photo. */
const ART = [
  { base: '#0b0a14', a: '#6d4bff', b: '#ff5f8f', c: '#1b6bff' },
  { base: '#0c120c', a: '#2fbf71', b: '#f2a541', c: '#0f6b4a' },
  { base: '#08111a', a: '#18c6e8', b: '#3a5bff', c: '#9b5cff' },
  { base: '#120b0d', a: '#ff6b6b', b: '#14b8a6', c: '#7c2d12' },
];

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader
          title="Featured projects"
          intro="These selected projects show how I blend engineering with AI — solving real problems with clean, reliable software."
        />

        <div className="mt-12">
          {featured.map((project, i) => (
            <FeaturedCard key={project.no} project={project} index={i} />
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <PillButton onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} aria-controls="all-projects">
            {showAll ? 'Show fewer projects' : 'Browse all projects'}
          </PillButton>
        </div>

        <AnimatePresence initial={false}>
          {showAll ? (
            <motion.div
              id="all-projects"
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ul className="grid gap-5 pt-12 sm:grid-cols-2">
                {rest.map((project) => (
                  <ProjectTile key={project.no} project={project} />
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </section>
  );
};

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => {
  const art = ART[index % ART.length];
  // a round arrow button trails the cursor across the card (centred when idle)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ax = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.6 });
  const ay = useSpring(my, { stiffness: 180, damping: 20, mass: 0.6 });
  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="sticky mb-10 md:mb-16" style={{ top: `${88 + index * 16}px` }}>
      <motion.a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        onPointerMove={track}
        onPointerLeave={reset}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="group relative isolate flex h-[min(38rem,78svh)] min-h-[26rem] items-center justify-center overflow-hidden rounded-3xl px-6 text-center shadow-2xl shadow-black/20"
        style={{ backgroundColor: art.base }}
      >
        <motion.span
          aria-hidden="true"
          style={{ x: ax, y: ay }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 -mt-7 -ml-7 hidden size-14 place-items-center rounded-full bg-brand text-brand-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:grid"
        >
          <ArrowUpRight className="size-6" />
        </motion.span>
        {/* colour field */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            className="absolute -left-[10%] -top-[20%] size-[70%] rounded-full opacity-70 blur-[90px]"
            style={{ background: art.a }}
          />
          <div
            className="absolute -bottom-[25%] -right-[5%] size-[65%] rounded-full opacity-60 blur-[100px]"
            style={{ background: art.b }}
          />
          <div
            className="absolute left-[35%] top-[40%] size-[40%] rounded-full opacity-50 blur-[80px]"
            style={{ background: art.c }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <span className="absolute -bottom-[0.18em] right-[0.04em] select-none font-display-caps text-[clamp(10rem,30vw,24rem)] font-bold leading-none text-white/[0.07]">
            {project.no}
          </span>
        </div>

        <div className="flex max-w-2xl flex-col items-center">
          <Tag>{project.tag}</Tag>
          <h3 className="mt-5 font-display-caps text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white">{project.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{project.description}</p>
          <ul className="mt-6 flex max-w-xl flex-wrap justify-center gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                {tech}
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#303030] transition-transform group-hover:-translate-y-0.5">
            <GithubIcon className="size-4" />
            View on GitHub
          </span>
        </div>
      </motion.a>
    </div>
  );
};

const ProjectTile = ({ project }: { project: Project }) => (
  <motion.li
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, ease: EASE }}
  >
    <a
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl bg-soft p-6 transition-colors hover:bg-line/60"
    >
      <div className="flex items-center justify-between">
        <span className="font-display-caps text-sm text-muted-ink">{project.no}</span>
        <span className="rounded-full border border-brand px-3 py-0.5 text-xs text-brand">{project.tag}</span>
      </div>
      <h3 className="mt-4 flex items-start justify-between gap-3 font-display-caps text-2xl font-semibold text-ink">
        {project.title}
        <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.description}</p>
      <p className="mt-auto pt-5 text-xs text-muted-ink">{project.stack.join(' · ')}</p>
    </a>
  </motion.li>
);
