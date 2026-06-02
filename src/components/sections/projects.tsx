import { ArrowUpRight } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { projects } from '@/data/portfolio';

export const Projects = () => (
  <section id="projects" className="w-full bg-secondary">
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-600">
            Selected Work
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Projects<span className="text-yellow-500">.</span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/60">
            Scroll through {projects.length} things I&apos;ve built — full-stack apps,
            AI assistants, mobile, and machine-learning projects.
          </p>
        </div>
      }
    >
      <div className="h-full w-full overflow-y-auto px-1 py-1 md:px-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.no}
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-yellow-500/60"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-bold tracking-widest text-yellow-600">
                  {project.no}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>

              <h3 className="mt-4 text-base font-bold text-foreground">{project.title}</h3>
              <p className="mt-2 grow text-sm leading-relaxed text-foreground/70">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </ContainerScroll>
  </section>
);
