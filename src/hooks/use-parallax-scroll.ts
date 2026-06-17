import { useEffect, type RefObject } from 'react';

interface ParallaxOptions {
  maxBlur?: number;
  zoom?: number;
}

export function useParallaxScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { maxBlur = 12, zoom = 0.08 }: ParallaxOptions = {},
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
  }, [ref, maxBlur, zoom]);
}
