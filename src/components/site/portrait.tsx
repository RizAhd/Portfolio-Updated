import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { Logo } from './logo';
import { EASE } from './motion';

/** Wipes the card open from the bottom on first paint. */
const reveal = {
  initial: { clipPath: 'inset(100% -12% -12% -12% round 1rem)', y: 40 },
  animate: { clipPath: 'inset(-12% -12% -12% -12% round 1rem)', y: 0 },
  transition: { duration: 1.2, delay: 0.25, ease: EASE },
};

const Photo = () => (
  <img
    src={profile.photo}
    alt={`Portrait of ${profile.name}`}
    className="size-full object-cover object-[50%_22%]"
    width={716}
    height={1280}
    fetchPriority="high"
  />
);

/** Static portrait card (phones, where the card doesn't fly). */
export const PortraitCard = () => (
  <motion.div className="aspect-[5/7] overflow-hidden rounded-2xl bg-soft shadow-2xl shadow-black/15" {...reveal}>
    <Photo />
  </motion.div>
);

/** The reverse of the card, seen while it is flipped beside "What I can do for you". */
const CardBack = () => (
  <div className="relative flex size-full flex-col justify-between overflow-hidden bg-brand p-7 text-brand-ink">
    <Logo aria-hidden="true" className="absolute -right-10 -bottom-8 h-[78%] opacity-15" />
    <div className="relative flex items-center justify-between text-xs font-medium">
      <span className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-brand-ink" />
        {profile.status}
      </span>
      <span>{profile.year}</span>
    </div>
    <div className="relative">
      <Logo aria-hidden="true" className="h-20 w-auto" />
      <p className="mt-6 font-display-caps text-3xl font-semibold">{profile.name}</p>
      <p className="mt-1 text-sm opacity-85">Software Engineer & AI Engineer</p>
    </div>
    <ul className="relative flex flex-wrap gap-1.5 text-[11px]">
      {['Python', 'React', 'AI / ML', 'Automation'].map((t) => (
        <li key={t} className="rounded-full border border-current/30 px-2.5 py-1">
          {t}
        </li>
      ))}
    </ul>
  </div>
);

interface Placement {
  top: number;
  left: number;
  width: number;
  /** horizontal travel from the hero slot (right) to the left-hand column; negative */
  travel: number;
  vh: number;
  /** offsets of the services and about sections within the stage */
  services: number;
  about: number;
}

/** Keyframe inputs for useTransform must increase; nudge any that don't. */
const rising = (points: number[]) =>
  points.reduce<number[]>((out, p) => [...out, out.length ? Math.max(p, out[out.length - 1] + 1) : p], []);

/**
 * Desktop only: the hero portrait stays pinned and glides from the right-hand
 * corner across into the left-hand column, flipping over beside "What I can do for you" and back again for
 * "About me", while the sections inside this stage scroll past it. The hero
 * marks the starting slot with `data-portrait-anchor`.
 */
export const PortraitStage = ({ children }: { children: ReactNode }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<Placement | null>(null);
  const { scrollY } = useScroll();

  const p = place ?? { top: 0, left: 0, width: 0, travel: 0, vh: 900, services: 900, about: 1800 };
  const arrive = p.services - p.vh * 0.25;
  const flip1 = rising([p.services - p.vh * 0.85, arrive]);
  const flip2 = rising([p.about - p.vh * 0.85, p.about - p.vh * 0.25]);

  const x = useTransform(scrollY, [0, arrive], [0, p.travel], { clamp: true });
  const scale = useTransform(scrollY, [0, arrive], [1, 1.08], { clamp: true });
  const rotateZ = useTransform(scrollY, rising([0, arrive, flip2[1]]), [0, 3, -3], { clamp: true });
  const rotateY = useTransform(scrollY, rising([...flip1, ...flip2]), [0, 180, 180, 360], { clamp: true });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      const anchor = stage.querySelector<HTMLElement>('[data-portrait-anchor]');
      if (!anchor) return;
      const s = stage.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();
      const offset = (sel: string) => {
        const el = stage.querySelector<HTMLElement>(sel);
        return el ? el.getBoundingClientRect().top - s.top : 0;
      };
      const left = a.left - s.left;
      // centre of the left-hand column of the 1120px content grid
      const content = Math.min(s.width, 1120) - 64;
      const target = s.width / 2 - content / 4 - 8;
      setPlace({
        top: a.top - s.top,
        left,
        width: a.width,
        travel: Math.min(0, target - (left + a.width / 2)),
        vh: window.innerHeight,
        services: offset('#services'),
        about: offset('#about'),
      });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="relative">
      {children}
      {place ? (
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
          <motion.div
            className="pointer-events-auto sticky"
            style={{ top: place.top, marginTop: place.top, marginLeft: place.left, width: place.width, x, scale, rotateZ }}
          >
            <motion.div {...reveal} style={{ perspective: 1400 }}>
              <motion.div className="relative aspect-[5/7]" style={{ rotateY, transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 overflow-hidden rounded-2xl bg-soft shadow-2xl shadow-black/15 [backface-visibility:hidden]">
                  <Photo />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/15 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <CardBack />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};
