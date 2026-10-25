import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { processSteps } from '@/data/portfolio';
import { Container, SectionHeader } from './primitives';
import { EASE } from './motion';

type Tone = 'inverse' | 'brand' | 'soft';

const TONES: Record<Tone, string> = {
  inverse: 'bg-panel text-panel-ink',
  brand: 'bg-brand text-brand-ink',
  soft: 'bg-soft text-ink',
};

const StepCard = ({ index, tone, className = '' }: { index: number; tone: Tone; className?: string }) => {
  const step = processSteps[index];
  return (
    <div className={`flex h-full flex-col justify-between rounded-2xl p-7 sm:p-8 ${TONES[tone]} ${className}`}>
      <span className="font-display-caps text-6xl font-bold">{String(index + 1).padStart(2, '0')}.</span>
      <div className="mt-14">
        <h3 className="font-display-caps text-[1.75rem] font-semibold">{step.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed opacity-85">{step.description}</p>
      </div>
    </div>
  );
};

/** A small editor window with a real snippet in the shape of Loki's tool loop. */
const CodeTile = () => (
  <div className="flex h-full min-h-64 flex-col overflow-hidden rounded-2xl bg-[#14151b] font-mono text-[12.5px] leading-relaxed text-[#c9d1d9]">
    <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 text-[11px] text-white/45">assistant.py</span>
    </div>
    <pre className="flex-1 overflow-hidden p-5">
      <code>
        <span className="text-[#ff7b72]">async def</span> <span className="text-[#d2a8ff]">answer</span>(query):{'\n'}
        {'    '}context = <span className="text-[#ff7b72]">await</span> search(query){'\n'}
        {'    '}reply = <span className="text-[#ff7b72]">await</span> llm.chat({'\n'}
        {'        '}system=<span className="text-[#a5d6ff]">"Cite sources."</span>,{'\n'}
        {'        '}messages=[context, query],{'\n'}
        {'    '}){'\n'}
        {'    '}<span className="text-[#ff7b72]">return</span> speak(reply)
      </code>
    </pre>
  </div>
);

const TerminalTile = () => (
  <div className="flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-2xl bg-[#0b0c0f] p-6 font-mono text-[12.5px] leading-relaxed">
    <p className="text-white/45">$ npm run build</p>
    <p className="text-[#7ee787]">✓ built in 8.4s</p>
    <p className="mt-2 text-white/45">$ git push origin main</p>
    <p className="text-white/70">main → main</p>
    <p className="mt-2 text-[#7ee787]">● deployed: live</p>
  </div>
);

const ROADMAP = [
  { label: 'Problem & users defined', done: true },
  { label: 'Scope and milestones agreed', done: true },
  { label: 'Data model & API contract', done: true },
  { label: 'Sprint 1: core flow', done: false },
  { label: 'Sprint 2: AI features', done: false },
];

/** A small planning board, the artefact the first step produces. */
const RoadmapTile = () => (
  <div className="flex h-full min-h-64 flex-col rounded-2xl border border-line bg-page p-6">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium tracking-wide text-muted-ink uppercase">Project roadmap</span>
      <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-medium text-brand-ink">3 / 5</span>
    </div>
    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
      <div className="h-full w-3/5 rounded-full bg-brand" />
    </div>
    <ul className="mt-5 space-y-3 text-sm">
      {ROADMAP.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <span
            className={`grid size-5 shrink-0 place-items-center rounded-full border text-[11px] ${
              item.done ? 'border-brand bg-brand text-brand-ink' : 'border-line text-transparent'
            }`}
            aria-hidden="true"
          >
            ✓
          </span>
          <span className={item.done ? 'text-ink-soft line-through decoration-line' : 'text-ink'}>{item.label}</span>
        </li>
      ))}
    </ul>
  </div>
);

const cells: { node: ReactNode; className?: string }[] = [
  { node: <StepCard index={0} tone="inverse" /> },
  { node: <RoadmapTile /> },
  { node: <StepCard index={1} tone="brand" /> },
  { node: <CodeTile /> },
  { node: <StepCard index={2} tone="soft" />, className: 'sm:col-span-2' },
  { node: <StepCard index={3} tone="brand" /> },
  { node: <StepCard index={4} tone="inverse" /> },
  { node: <TerminalTile /> },
];

export const Process = () => (
  <section id="process" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeader
        title="Build with strategy and craft"
        intro="My process blends planning and engineering to tackle real problems and ship software that holds up."
      />
      <ul className="mt-12 grid auto-rows-[minmax(16rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cells.map((cell, i) => (
          <motion.li
            key={i}
            className={cell.className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
          >
            {cell.node}
          </motion.li>
        ))}
      </ul>
    </Container>
  </section>
);
