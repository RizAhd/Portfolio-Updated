import { Timeline, type TimelineEntry } from '@/components/ui/timeline';
import { education } from '@/data/portfolio';

const ICONS = ['🎓', '🤖', '🗣️'];

const heading = (
  <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 sm:text-sm">
        Background
      </p>
      <h2 className="mt-2 text-[clamp(1.875rem,7vw,3rem)] font-extrabold tracking-tight text-foreground">
        Education<span className="text-yellow-500">.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
        Scroll to trace the path — each stop is where I studied.
      </p>
    </div>
  </div>
);

const entries: TimelineEntry[] = education.map((edu, i) => ({
  title: edu.period,
  content: (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8">
      <div className="flex size-14 items-center justify-center rounded-xl bg-yellow-500/15 text-3xl">
        {ICONS[i % ICONS.length]}
      </div>

      <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
        {edu.qualification}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {edu.institution}
      </p>
    </div>
  ),
}));

export const Education = () => (
  <section id="education" className="w-full overflow-x-clip bg-background">
    <Timeline data={entries} heading={heading} />
  </section>
);
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
