import { useEffect, useState } from 'react';
import SculptureHero from '@/components/ui/liquid-sculpture-hero';
import { profile } from '@/data/portfolio';
import type { Theme } from '@/hooks/use-theme';

const HEAD_FONT = "'Geist Variable', 'Helvetica Neue', Arial, sans-serif";
const ACCENT_FONT = "'Instrument Serif', 'Times New Roman', serif";

const PALETTE = {
  light: { bg: '#ffffff', text: '#141414', accent: '#a16207' },
  dark: { bg: '#0a0a0a', text: '#ecebe4', accent: '#eab308' },
} as const;

type Palette = (typeof PALETTE)[Theme];

interface NameImages {
  wideLight: string;
  wideDark: string;
  stackedLight: string;
  stackedDark: string;
}

interface Run {
  text: string;
  font: string;
  /** letter-spacing in px */
  spacing: number;
  color: string;
}

/**
 * Draws the name the way the old headline set it — first name upright, surname
 * in the gold italic accent — on a transparent canvas the particle engine can
 * sample. "wide" is one line; "stacked" puts the surname under it for phones.
 */
function drawName(layout: 'wide' | 'stacked', palette: Palette): Promise<string> {
  const [first, ...rest] = profile.name.split(' ');
  const size = layout === 'wide' ? 440 : 300;
  const runs: Run[] = [
    { text: first, font: `500 ${size}px ${HEAD_FONT}`, spacing: -0.045 * size, color: palette.text },
    { text: rest.join(' '), font: `italic 400 ${size}px ${ACCENT_FONT}`, spacing: -0.02 * size, color: palette.accent },
  ];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(new Error('2D canvas unavailable'));

  const metrics = runs.map((run) => {
    ctx.font = run.font;
    ctx.letterSpacing = `${run.spacing}px`;
    const m = ctx.measureText(run.text);
    return {
      advance: m.width,
      left: m.actualBoundingBoxLeft,
      right: m.actualBoundingBoxRight,
      ascent: m.actualBoundingBoxAscent,
      descent: m.actualBoundingBoxDescent,
    };
  });

  // Pen positions (baseline origin) for each run.
  const pens =
    layout === 'wide'
      ? [
          { x: 0, y: 0 },
          { x: metrics[0].advance + 0.24 * size, y: 0 },
        ]
      : metrics.map((m, i) => ({ x: -(m.right - m.left) / 2, y: i * 0.92 * size }));

  const minX = Math.min(...pens.map((p, i) => p.x - metrics[i].left));
  const maxX = Math.max(...pens.map((p, i) => p.x + metrics[i].right));
  const minY = Math.min(...pens.map((p, i) => p.y - metrics[i].ascent));
  const maxY = Math.max(...pens.map((p, i) => p.y + metrics[i].descent));
  const pad = Math.round(0.08 * size);

  canvas.width = Math.ceil(maxX - minX) + pad * 2;
  canvas.height = Math.ceil(maxY - minY) + pad * 2;
  // Resizing resets the context, so styles are applied per run while drawing.
  runs.forEach((run, i) => {
    ctx.font = run.font;
    ctx.letterSpacing = `${run.spacing}px`;
    ctx.fillStyle = run.color;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(run.text, pens[i].x - minX + pad, pens[i].y - minY + pad);
  });

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(URL.createObjectURL(blob)) : reject(new Error('toBlob failed'))))
  );
}

const VARIANTS: [keyof NameImages, 'wide' | 'stacked', Theme][] = [
  ['wideLight', 'wide', 'light'],
  ['wideDark', 'wide', 'dark'],
  ['stackedLight', 'stacked', 'light'],
  ['stackedDark', 'stacked', 'dark'],
];

/**
 * Renders the name images once the web fonts are ready. Each variant is handed
 * over as soon as it is encoded, so the one on screen doesn't wait for the rest.
 */
function useNameImages(): Partial<NameImages> {
  const [images, setImages] = useState<Partial<NameImages>>({});

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    const fontsReady = Promise.all([
      document.fonts.load(`500 100px ${HEAD_FONT}`),
      document.fonts.load(`italic 400 100px ${ACCENT_FONT}`),
    ]).catch(() => undefined);

    for (const [key, layout, theme] of VARIANTS) {
      fontsReady
        .then(() => drawName(layout, PALETTE[theme]))
        .then((url) => {
          if (cancelled) {
            URL.revokeObjectURL(url);
            return;
          }
          urls.push(url);
          setImages((prev) => ({ ...prev, [key]: url }));
        })
        .catch(() => {
          // That variant stays empty; the copy below still renders.
        });
    }

    return () => {
      cancelled = true;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return images;
}

interface HeroProps {
  theme: Theme;
}

// The name is rebuilt from GPU particles; the cursor turns it liquid.
export const Hero = ({ theme }: HeroProps) => {
  const images = useNameImages();

  return (
    <SculptureHero
      id="home"
      theme={theme}
      // The site's fixed <Navbar /> already covers navigation and the theme toggle.
      showNav={false}
      topInset={88}
      showCredit={false}
      loadFonts={false}
      headingFont={HEAD_FONT}
      bodyFont={HEAD_FONT}
      accentFont={ACCENT_FONT}
      // null = still being drawn; the hero waits instead of showing a stand-in
      src={images.wideLight ?? null}
      darkSrc={images.wideDark ?? null}
      mobileSrc={images.stackedLight ?? null}
      mobileDarkSrc={images.stackedDark ?? null}
      imageAlt={profile.name}
      eyebrow={`${profile.location} — ${profile.status}`}
      headline={'Software &\nAI Engineer.'}
      headlineAccent="AI Engineer."
      body={profile.shortBio}
      primaryCta={{ label: 'View my work', href: '#projects' }}
      secondaryCta={{ label: 'Get in touch', href: '#contact' }}
      hint="Move across my name"
      hintTouch="Touch my name"
      backdropText=""
      background={PALETTE.light.bg}
      darkBackground={PALETTE.dark.bg}
      textColor={PALETTE.light.text}
      darkTextColor={PALETTE.dark.text}
      accentColor={PALETTE.light.accent}
      darkAccentColor={PALETTE.dark.accent}
      // Short screens scroll rather than squeeze the name into the copy.
      height="max(100svh, 620px)"
      // The defaults let a sculpture overshoot its band by 10–20%; text must fit it.
      sculptureScale={0.9}
      mobileSculptureScale={0.82}
      sculptureMaxWidth={0.92}
      particleDensity={1.4}
      ambientIntensity={0.3}
    />
  );
};
