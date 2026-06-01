import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { profile, contact } from '@/data/portfolio';
import type { Theme } from '@/hooks/use-theme';

// Full-screen hero: an animated Three.js dotted-surface fills the viewport,
// with nav, name, tagline, status, and socials overlaid on top. Fully
// theme-aware — background, dots, and text all follow the light/dark toggle.

const socialLinks = [
  { icon: GithubIcon, href: contact.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: contact.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
];

interface ShaderHeroProps {
  className?: string;
  theme: Theme;
}

export const ShaderHero = ({ className, theme }: ShaderHeroProps) => {
  return (
    <section
      id="home"
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-6 font-sans text-foreground md:p-12',
        className
      )}
    >
      {/* Animated dotted-surface background — scoped to this section (absolute,
          not the component's default fixed). Follows the live theme so the dots
          are dark on a light page and light on a dark page. */}
      <DottedSurface theme={theme} className="absolute inset-0 z-0" />
      {/* Soft radial glow for depth, matching the component's demo treatment. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.08),transparent_55%)] blur-2xl"
      />

      {/* Header — just the live-status pill; nav + logo + theme toggle live in
          the sticky Navbar that overlays the top of the page. */}
      <header className="relative z-30 mt-16 flex w-full max-w-7xl items-center justify-end sm:mt-20">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs font-medium tracking-widest text-foreground/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          {profile.status.toUpperCase()}
        </motion.span>
      </header>

      {/* Center content — name + tagline overlaid on the shader */}
      <div className="relative z-20 flex grow flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-4 text-6xl font-extrabold leading-[0.95] tracking-tighter text-foreground md:text-8xl lg:text-9xl"
        >
          Riflan
          <br />
          Mohamed<span className="text-yellow-400">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-foreground/80 md:text-base"
        >
          {profile.shortBio}
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/10"
        >
          Explore my work
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </div>

      {/* Footer — socials + location */}
      <footer className="relative z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-foreground/60 transition-colors hover:text-foreground"
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-sm font-medium text-foreground/80"
        >
          {profile.location}
        </motion.div>
      </footer>
    </section>
  );
};
