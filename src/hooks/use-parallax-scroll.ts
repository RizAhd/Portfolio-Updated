import { useEffect, type RefObject } from 'react';

interface ParallaxOptions {
  /** Max blur in px (the source effect used scrollTop/100, uncapped — we cap it). */
  maxBlur?: number;
  /** Extra scale applied across the element's height (subtle zoom for depth). */
  zoom?: number;
  /** Fade multiplier — higher fades out sooner (source used 1.3). */
  fade?: number;
}

/**
 * Scroll-driven parallax effect, distilled from the parallax-scrolling-effect
 * component: as the page scrolls, the referenced element blurs, fades, and
 * subtly zooms — giving a sense of depth as it recedes. Just the scroll effect,
 * no background image or content of its own.
 *
 * Respects `prefers-reduced-motion`, throttles with requestAnimationFrame, and
 * works with the site's Lenis smooth scroll (which emits native scroll events).
 */
export function useParallaxScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { maxBlur = 12, zoom = 0.08, fade = 1.3 }: ParallaxOptions = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = el.clientHeight || window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollTop / height));

      el.style.filter = `blur(${Math.min(maxBlur, scrollTop / 100)}px)`;
      el.style.opacity = `${Math.max(0, 1 - progress * fade)}`;
      el.style.transform = `scale(${1 + progress * zoom})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, maxBlur, zoom, fade]);
}
