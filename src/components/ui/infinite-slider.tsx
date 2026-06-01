import { cn } from '@/lib/utils';
import { Children } from 'react';

// Infinite marquee slider — CSS-keyframe based so it's full from the first
// frame and loops perfectly with no visible start/end and no measure-delay
// snap. The track holds two identical copies of the children and translates by
// exactly -50% (or +50% reversed), so when one copy scrolls out the other has
// already taken its place. Same props as before (gap, duration, reverse,
// durationOnHover) so callers don't change.
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
  // Reverse flips which direction the -50% travel goes.
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
            willChange: 'transform',
          } as React.CSSProperties
        }
      >
        {/* Two identical copies → translating -50% loops seamlessly. The track
            is full of content from frame one, so there is no start/end. */}
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
