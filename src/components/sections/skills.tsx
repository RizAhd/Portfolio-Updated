import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { skillGroups } from '@/data/portfolio';

// Each skill group becomes a pinned scroll-story panel. We theme the panels in
// an alternating palette (neutral / accent yellow / dark) that reads in both
// light and dark mode, instead of the sample component's hardcoded hex colors.
const palettes = [
  { background: '#0a0a0a', color: '#ffffff', rule: 'rgba(255,255,255,0.4)', accent: '#facc15', chipBg: 'rgba(255,255,255,0.08)', chipColor: '#ffffff' },
  { background: '#facc15', color: '#0a0a0a', rule: 'rgba(0,0,0,0.5)', accent: '#0a0a0a', chipBg: 'rgba(0,0,0,0.08)', chipColor: '#0a0a0a' },
  { background: '#171717', color: '#fafafa', rule: 'rgba(255,255,255,0.35)', accent: '#facc15', chipBg: 'rgba(255,255,255,0.08)', chipColor: '#fafafa' },
  { background: '#f5f5f4', color: '#0a0a0a', rule: 'rgba(0,0,0,0.45)', accent: '#ca8a04', chipBg: 'rgba(0,0,0,0.06)', chipColor: '#0a0a0a' },
] as const;

export const Skills = () => (
  <section id="skills">
    <FlowArt aria-label="Skills — what I use">
      {skillGroups.map((group, i) => {
        const p = palettes[i % palettes.length];
        const num = String(i + 1).padStart(2, '0');
        return (
          <FlowSection
            key={group.category}
            aria-label={group.category}
            style={{ backgroundColor: p.background, color: p.color }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              {num} — {i === 0 ? 'What I use' : 'Skills'}
            </p>
            <hr className="my-[2vw] border-none border-t" style={{ borderColor: p.rule }} />

            <div>
              <h2 className="text-[clamp(2.25rem,9vw,11rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
                {group.category.split(/\s+/).map((word, w) => (
                  <span key={w} className="block">
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            <hr className="my-[2vw] border-none border-t" style={{ borderColor: p.rule }} />

            <div className="mt-auto flex flex-wrap gap-3">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-4 py-2 text-[clamp(0.8rem,1.4vw,1.05rem)] font-medium"
                  style={{ backgroundColor: p.chipBg, color: p.chipColor }}
                >
                  {item}
                </span>
              ))}
            </div>
          </FlowSection>
        );
      })}
    </FlowArt>
  </section>
);
