import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShaderAnimation } from '@/components/ui/shader-animation';
import { ThemeToggle } from '@/components/theme-toggle';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { profile, contact, navLinks } from '@/data/portfolio';
import type { Theme } from '@/hooks/use-theme';

// Full-screen shader-background hero: the animated WebGL shader fills the
// viewport, with nav, name, tagline, status, and socials overlaid in light
// text on top. Replaces the light portrait hero as the page intro.

const socialLinks = [
  { icon: GithubIcon, href: contact.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: contact.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
];

interface ShaderHeroProps {
  className?: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export const ShaderHero = ({ className, theme, onToggleTheme }: ShaderHeroProps) => {
  return (
    <section
      id="home"
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-black p-6 font-sans text-white md:p-12',
        className
      )}
    >
      {/* Animated shader background — fills the whole section */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation className="h-full" />
      </div>
      {/* Subtle dark scrim so overlaid text stays legible over bright streaks */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" />

      {/* Header */}
      <header className="relative z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider"
        >
          riflan<span className="text-yellow-400">.</span>
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-widest text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <span className="hidden items-center gap-2 text-xs font-medium tracking-widest text-white/70 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {profile.status.toUpperCase()}
          </span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </motion.div>
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
          className="mt-4 text-6xl font-extrabold leading-[0.95] tracking-tighter text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] md:text-8xl lg:text-9xl"
        >
          Riflan
          <br />
          Mohamed<span className="text-yellow-400">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base"
        >
          {profile.shortBio}
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
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
              className="text-white/60 transition-colors hover:text-white"
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-sm font-medium text-white/80"
        >
          {profile.location}
        </motion.div>
      </footer>
    </section>
  );
};
