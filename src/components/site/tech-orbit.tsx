import type { CSSProperties } from 'react';
import { techGroups, type Tool } from '@/data/portfolio';
import { Logo } from './logo';

/** Every tool that has a logo, once each (React and React Native share one). */
const logos = techGroups
  .flatMap((g) => g.tools)
  .filter((t): t is Required<Tool> => Boolean(t.icon))
  .filter((t, i, all) => all.findIndex((o) => o.icon === t.icon) === i);

/** radius is a % of the orbit's width; speed in seconds per turn; size in px */
const RING_SPECS = [
  { radius: 17, count: 5, speed: 26, reverse: false, size: 36 },
  { radius: 31, count: 8, speed: 38, reverse: true, size: 40 },
  { radius: 45, count: 12, speed: 56, reverse: false, size: 44 },
];

const RINGS = RING_SPECS.map((ring, r) => {
  const start = RING_SPECS.slice(0, r).reduce((n, x) => n + x.count, 0);
  return { ...ring, items: logos.slice(start, start + ring.count) };
});

/** Three rings of tech logos turning around the R mark. Hover to pause. */
export const TechOrbit = ({ total }: { total: number }) => (
  <div className="orbit relative mx-auto aspect-square w-full max-w-[30rem]" aria-hidden="true">
    {RINGS.map(({ items, ...ring }) => (
      <div key={ring.radius}>
        {/* track */}
        <div
          className="absolute rounded-full border border-dashed border-line"
          style={{ inset: `${50 - ring.radius}%` }}
        />
        {/* the ring turns; each logo counter-turns so it stays upright */}
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
                style={{
                  left: `${50 + ring.radius * Math.cos(angle)}%`,
                  top: `${50 + ring.radius * Math.sin(angle)}%`,
                }}
              >
                <span
                  className="orbit-item grid place-items-center rounded-full border border-line bg-white p-2 shadow-md shadow-black/10"
                  style={{ width: ring.size, height: ring.size, margin: -ring.size / 2 }}
                  title={tool.name}
                >
                  <img src={tool.icon} alt="" loading="lazy" className="size-full object-contain" />
                </span>
              </span>
            );
          })}
        </div>
      </div>
    ))}

    {/* centre */}
    <div className="absolute inset-[38%] grid place-items-center rounded-full bg-inverse text-inverse-ink shadow-xl shadow-black/15">
      <div className="flex flex-col items-center">
        <Logo className="h-7 w-auto" title="" />
        <span className="mt-1.5 font-display-caps text-lg leading-none">{total}+ tools</span>
      </div>
    </div>
  </div>
);
