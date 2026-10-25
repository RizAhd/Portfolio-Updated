import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { EASE } from './motion';

/** The page's content column (1120px at desktop, like the original layout). */
export const Container = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('relative mx-auto w-full max-w-[1120px] px-5 sm:px-8', className)} {...props} />
);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fades content up the first time it scrolls into view. */
export const Reveal = ({ children, className, delay = 0, y = 28 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

interface SectionHeaderProps {
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, intro, className }: SectionHeaderProps) => (
  <Reveal className={cn('max-w-xl', className)}>
    <h2 className="font-display-caps text-[clamp(2.75rem,6vw,4.25rem)] font-semibold text-ink">{title}</h2>
    {intro ? <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">{intro}</p> : null}
  </Reveal>
);

const pillClass =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand px-7 font-display-caps text-lg tracking-wide text-brand transition-colors duration-300 hover:bg-brand hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4';

/** Outlined accent pill, as a link. */
export const PillLink = ({ className, ...props }: ComponentProps<'a'>) => (
  <a className={cn(pillClass, className)} {...props} />
);

/** Outlined accent pill, as a button. */
export const PillButton = ({ className, type = 'button', ...props }: ComponentProps<'button'>) => (
  <button type={type} className={cn(pillClass, 'cursor-pointer', className)} {...props} />
);

/** Counts from 0 to `value` the first time it scrolls into view. */
export const CountUp = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {reduce && inView ? value : shown}
      {suffix}
    </span>
  );
};
