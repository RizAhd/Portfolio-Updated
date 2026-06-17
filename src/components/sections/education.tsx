import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from '@/components/ui/animated-cards-stack';
import { education } from '@/data/portfolio';

// One icon per education entry (BSc · Diploma ML&AI · Diploma English).
const ICONS = ['🎓', '🤖', '🗣️'];

export const Education = () => (
  <section
    id="education"
    className="w-full overflow-x-clip bg-background px-4 pt-16 sm:px-6 sm:pt-20 md:px-12"
  >
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 sm:text-sm">
        Background
      </p>
      <h2 className="mt-2 text-[clamp(1.875rem,7vw,3rem)] font-extrabold tracking-tight text-foreground">
        Education<span className="text-yellow-500">.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
        Scroll to flip through where I&apos;ve studied.
      </p>
    </div>

    {/* Scroll-driven stacking cards — height tuned to 3 cards so there's no
        long empty stretch before the next section. */}
    <ContainerScroll className="h-[130vh]">
      <div className="sticky top-0 flex h-svh w-full items-center justify-center pb-8">
        <CardsContainer className="mx-auto h-80 w-[min(92vw,440px)]">
          {education.map((edu, i) => (
            <CardTransformed
              key={edu.qualification}
              arrayLength={education.length}
              index={i + 1}
              role="article"
              aria-label={edu.qualification}
              className="items-start justify-between gap-4 border-border bg-card text-card-foreground !p-6 sm:!p-8"
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-yellow-500/15 text-3xl">
                  {ICONS[i % ICONS.length]}
                </div>
                <span className="pt-1 text-right text-xs font-bold uppercase tracking-widest text-yellow-600 sm:text-sm">
                  {edu.period}
                </span>
              </div>

              <div className="w-full">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                  {edu.qualification}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {edu.institution}
                </p>
              </div>
            </CardTransformed>
          ))}
        </CardsContainer>
      </div>
    </ContainerScroll>
  </section>
);
