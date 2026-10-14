import SculptureHero from '@/components/ui/liquid-sculpture-hero';
import { profile } from '@/data/portfolio';
import type { Theme } from '@/hooks/use-theme';

interface HeroProps {
  theme: Theme;
}

// Portrait rebuilt from GPU particles; the cursor turns it liquid.
export const Hero = ({ theme }: HeroProps) => (
  <SculptureHero
    id="home"
    theme={theme}
    // The site's fixed <Navbar /> already covers navigation and the theme toggle.
    showNav={false}
    topInset={88}
    showCredit={false}
    src={profile.cutout}
    imageAlt={`Portrait of ${profile.name}`}
    eyebrow={profile.tagline}
    headline={'Riflan\nMohamed'}
    headlineAccent="Mohamed"
    body={profile.shortBio}
    primaryCta={{ label: 'View my work', href: '#projects' }}
    secondaryCta={{ label: 'Get in touch', href: '#contact' }}
    hint="Move across the portrait"
    hintTouch="Touch the portrait"
    backdropText="RIFLAN"
    background="#ffffff"
    darkBackground="#0a0a0a"
    textColor="#141414"
    darkTextColor="#ecebe4"
    accentColor="#a16207"
    darkAccentColor="#eab308"
    sculptureScale={1.3}
    mobileSculptureScale={1.2}
    sculptureY={6}
    particleDensity={0.35}
    ambientIntensity={0.2}
    liquid={0.6}
  />
);
