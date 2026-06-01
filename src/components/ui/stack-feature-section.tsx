import { Button } from "@/components/ui/button";

// Orbiting-stack feature section (adapted from a Next.js component for Vite:
// "use client" + next/link dropped, brand react-icons replaced with text chips
// so it shows THIS site's real tech stack instead of generic logos). The left
// side shows a heading/description/CTA; the right shows the orbiting chips.
interface StackFeatureSectionProps {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Center label shown in the hub circle (e.g. initials). */
  centerLabel: string;
  /** The orbiting items — short tech/skill labels. */
  items: string[];
}

export default function StackFeatureSection({
  heading,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  centerLabel,
  items,
}: StackFeatureSectionProps) {
  const orbitCount = 3;
  const orbitGap = 8; // rem between orbits
  const iconsPerOrbit = Math.ceil(items.length / orbitCount);

  return (
    <section className="relative flex h-[30rem] items-center justify-between overflow-hidden rounded-3xl border border-border bg-card pl-8 md:pl-10">
      {/* Left side: heading, text, CTA */}
      <div className="z-10 w-full md:w-1/2">
        <h3 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          {heading}
        </h3>
        <p className="mb-6 max-w-lg pr-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <Button variant="default" size="lg" asChild>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
            </a>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button variant="outline" size="lg" asChild>
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          )}
        </div>
      </div>

      {/* Right side: orbit animation cropped to ~1/2 (hidden on small screens) */}
      <div className="relative hidden h-full w-1/2 items-center justify-start overflow-hidden md:flex">
        <div className="relative flex h-[50rem] w-[50rem] translate-x-[50%] items-center justify-center">
          {/* Center hub */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500 text-lg font-extrabold text-black shadow-lg">
            {centerLabel}
          </div>

          {/* Generate orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-border"
                style={{
                  width: size,
                  height: size,
                  animation: `stack-orbit-spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {items
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((label, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={label}
                        className="absolute whitespace-nowrap rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-md"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          // Counter-rotate each chip so its text stays upright.
                          transform: "translate(-50%, -50%)",
                          animation: `stack-orbit-spin-reverse ${12 + orbitIdx * 6}s linear infinite`,
                        }}
                      >
                        {label}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes stack-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes stack-orbit-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
