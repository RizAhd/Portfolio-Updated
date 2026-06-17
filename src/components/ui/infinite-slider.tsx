import { cn } from '@/lib/utils';
import { Children } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const horizontal = direction === 'horizontal';
  const axis = horizontal ? 'x' : 'y';

  const anim = `infinite-slider-${axis}${reverse ? '-reverse' : ''}`;

  return (
    <div
      className={cn('group/slider overflow-hidden', className)}
      style={
        {
          '--slider-duration': `${duration}s`,
          '--slider-duration-hover': `${durationOnHover ?? duration}s`,
        } as React.CSSProperties
      }
    >
      <div
        className="flex w-max group-hover/slider:animation-duration-(--slider-duration-hover)"
        style={
          {
            gap: `${gap}px`,
            flexDirection: horizontal ? 'row' : 'column',
            '--slider-gap': `${gap}px`,
            animationName: anim,
            animationDuration: 'var(--slider-duration)',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            // Start mid-cycle so the strip is already in motion / full on the
            // very first frame, instead of appearing to "begin" from an edge.
            animationDelay: `calc(var(--slider-duration) * -0.5)`,
            willChange: 'transform',
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0" style={{ gap: `${gap}px`, flexDirection: horizontal ? 'row' : 'column' }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: `${gap}px`, flexDirection: horizontal ? 'row' : 'column' }} aria-hidden="true">
          {Children.toArray(children)}
        </div>
      </div>
    </div>
  );
}
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
