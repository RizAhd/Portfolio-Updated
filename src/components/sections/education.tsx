import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { education } from '@/data/portfolio';

// Education as a pinned scroll-story: each qualification is a full-screen panel
// that pins and rotates up into place as you scroll. Panels follow the theme
// tokens so they flip with the light/dark toggle, alternating between the page
// background, the card surface, and a brand-yellow accent panel.
const palettes = [
  { background: 'var(--background)', color: 'var(--foreground)', rule: 'var(--border)', sub: 'var(--muted-foreground)' },
  { background: '#facc15', color: '#0a0a0a', rule: 'rgba(0,0,0,0.5)', sub: 'rgba(0,0,0,0.7)' },
  { background: 'var(--card)', color: 'var(--card-foreground)', rule: 'var(--border)', sub: 'var(--muted-foreground)' },
  { background: 'var(--secondary)', color: 'var(--secondary-foreground)', rule: 'var(--border)', sub: 'var(--muted-foreground)' },
] as const;

export const Education = () => (
  <section id="education" className="w-full overflow-x-clip">
    <FlowArt aria-label="Education">
      {education.map((edu, i) => {
        const p = palettes[i % palettes.length];
        const num = String(i + 1).padStart(2, '0');
        return (
          <FlowSection
            key={edu.qualification}
            aria-label={edu.qualification}
            style={{ backgroundColor: p.background, color: p.color }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              {num} — Education
            </p>
            <hr className="my-[2vw] border-none border-t" style={{ borderColor: p.rule }} />

            <div>
              <h2 className="text-[clamp(2.25rem,8vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
                {edu.qualification.split(/\s+/).map((word, w) => (
                  <span key={w} className="block">
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            <hr className="my-[2vw] border-none border-t" style={{ borderColor: p.rule }} />

            <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
              <p
                className="max-w-[40ch] text-[clamp(1rem,2.5vw,2rem)] font-medium leading-tight"
                style={{ color: p.sub }}
              >
                {edu.institution}
              </p>
              <p
                className="text-[clamp(0.9rem,1.6vw,1.25rem)] font-bold uppercase tracking-widest"
                style={{ color: p.sub }}
              >
                {edu.period}
              </p>
            </div>
          </FlowSection>
        );
      })}
    </FlowArt>
  </section>
);
