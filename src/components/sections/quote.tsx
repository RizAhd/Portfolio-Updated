import DotPattern from '@/components/ui/dot-pattern-1';

/**
 * A compact "words I build by" quote band, shown between Projects and Skills.
 * Reuses the dot-pattern background + corner-marker frame from the source
 * component, re-themed from the demo's red to the site's gold accent and made
 * light/dark-safe (foreground text, theme-aware dot fill).
 */
export const Quote = () => (
  <section id="quote" className="w-full bg-background py-16 md:py-24">
    <div className="mx-auto max-w-4xl px-6">
      <div className="relative flex flex-col items-center border border-yellow-500/50">
        <DotPattern width={6} height={6} className="fill-yellow-500/15 md:fill-yellow-500/25" />

        {/* corner markers */}
        <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-yellow-500" />
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-yellow-500" />
        <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-yellow-500" />
        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-yellow-500" />

        <div className="relative z-20 mx-auto w-full px-6 py-12 text-center md:px-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 md:text-sm">
            Words I build by
          </p>

          <blockquote className="mt-6 text-foreground">
            <p className="text-2xl leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
              <span className="font-thin text-foreground/80">
                &ldquo;Half of what separates the successful from the
                unsuccessful is{' '}
              </span>
              <span className="font-semibold text-yellow-500">pure perseverance.</span>
              <span className="font-thin text-foreground/80">&rdquo;</span>
            </p>

            <footer className="mt-8 text-sm font-medium tracking-wide text-foreground/60 md:text-base">
              &mdash; Steve Jobs <span className="text-foreground/40">· Co-founder, Apple</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
);

export default Quote;
