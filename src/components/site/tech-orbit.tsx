import type { CSSProperties, ReactNode } from 'react';
import { techGroups, type Tool } from '@/data/portfolio';
import { Logo } from './logo';

interface RingSpec {
  /** % of the orbit's width */
  radius: number;
  count: number;
  /** seconds per turn */
  speed: number;
  reverse?: boolean;
}

interface OrbitProps {
  tools: Tool[];
  rings: RingSpec[];
  /** logo tile size in px */
  icon: number;
  /** centre disc, as an inset % (bigger = smaller disc) */
  hub: number;
  center: ReactNode;
  label: string;
  className?: string;
}

/** One logo with its name underneath; counter-turns with the ring so both stay upright. */
const Item = ({ tool, icon }: { tool: Tool; icon: number }) => (
  <span className="orbit-item relative block" style={{ width: icon, height: icon, margin: -icon / 2 }}>
    <span className="grid size-full place-items-center rounded-full border border-line bg-white p-[18%] shadow-md shadow-black/10">
      {tool.icon ? (
        <img src={tool.icon} alt="" loading="lazy" className="size-full object-contain" />
      ) : (
        <span className="text-[10px] font-bold text-[#151413]">{tool.name.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
    <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[10px] leading-tight font-medium whitespace-nowrap text-ink sm:text-[11px]">
      {tool.name}
    </span>
  </span>
);

/** Rings of logos turning around a centre disc; alternate rings turn the other way. Hover to pause. */
const Orbit = ({ tools, rings, icon, hub, center, label, className = '' }: OrbitProps) => {
  const starts = rings.map((_, r) => rings.slice(0, r).reduce((n, x) => n + x.count, 0));
  return (
    <div className={`orbit relative mx-auto aspect-square ${className}`} role="img" aria-label={label}>
      {rings.map((ring, r) => {
        const items = tools.slice(starts[r], starts[r] + ring.count);
        return (
          <div key={ring.radius} aria-hidden="true">
            <div className="absolute rounded-full border border-dashed border-line" style={{ inset: `${50 - ring.radius}%` }} />
            <div
              className={`orbit-ring absolute inset-0 ${ring.reverse ? 'reverse' : ''}`}
              style={{ '--orbit-speed': `${ring.speed}s` } as CSSProperties}
            >
              {items.map((tool, i) => {
                const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <span
                    key={tool.name}
                    className="absolute"
                    style={{ left: `${50 + ring.radius * Math.cos(angle)}%`, top: `${50 + ring.radius * Math.sin(angle)}%` }}
                  >
                    <Item tool={tool} icon={icon} />
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
      <div
        aria-hidden="true"
        className="absolute grid place-items-center rounded-full bg-inverse text-center text-inverse-ink shadow-xl shadow-black/15"
        style={{ inset: `${hub}%` }}
      >
        {center}
      </div>
    </div>
  );
};

const allTools = techGroups.flatMap((g) => g.tools);
const names = (tools: Tool[]) => tools.map((t) => t.name).join(', ');
const group = (...categories: string[]) =>
  techGroups.filter((g) => categories.includes(g.category)).flatMap((g) => g.tools);

/** Phones: three smaller orbits, each fully on screen, so every name stays readable. */
const PHONE_ORBITS = [
  { title: 'Languages & Frontend', tools: group('Languages', 'Frontend & Mobile') },
  { title: 'Backend & AI', tools: group('Backend & Real-Time', 'AI & Machine Learning') },
  { title: 'Data, Cloud & Tools', tools: group('Data & Cloud', 'Automation & Tools') },
];

/** The whole stack: one large four-ring orbit on wider screens, three compact ones on phones. */
export const TechOrbit = () => (
  <>
    <Orbit
      className="hidden w-full max-w-[46rem] sm:block"
      tools={allTools}
      icon={40}
      hub={44}
      label={`Tech stack: ${names(allTools)}`}
      rings={[
        { radius: 15, count: 6, speed: 34 },
        { radius: 25, count: 10, speed: 48, reverse: true },
        { radius: 35, count: 14, speed: 64 },
        { radius: 45, count: allTools.length - 30, speed: 84, reverse: true },
      ]}
      center={
        <span className="flex flex-col items-center">
          <Logo className="h-5 w-auto" title="" />
          <span className="mt-1 font-display-caps text-sm leading-none">{allTools.length} tools</span>
        </span>
      }
    />

    <div className="space-y-6 sm:hidden">
      {PHONE_ORBITS.map((o, i) => {
        const inner = Math.ceil(o.tools.length * 0.35);
        return (
          <Orbit
            key={o.title}
            className="w-full max-w-[24rem]"
            tools={o.tools}
            icon={34}
            hub={38}
            label={`${o.title}: ${names(o.tools)}`}
            rings={[
              { radius: 24, count: inner, speed: 30 + i * 4, reverse: i % 2 === 1 },
              { radius: 42, count: o.tools.length - inner, speed: 46 + i * 6, reverse: i % 2 === 0 },
            ]}
            center={<span className="px-2 font-display-caps text-[13px] leading-tight">{o.title}</span>}
          />
        );
      })}
    </div>
  </>
);
