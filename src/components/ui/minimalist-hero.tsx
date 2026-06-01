import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { profile, contact, navLinks } from '@/data/portfolio';

// A minimalist portrait hero, wired directly to the portfolio data source.
// Header nav + centered portrait inside an accent circle + name overlay,
// with social links and location pinned to the footer.

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const socialLinks = [
  { icon: GithubIcon, href: contact.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: contact.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
];

export const MinimalistHero = ({ className }: { className?: string }) => {
  return (
    <section
      id="home"
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-6 font-sans md:p-12',
        className
      )}
    >
      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider"
        >
          riflan<span className="text-yellow-500">.</span>
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-2 text-xs font-medium tracking-widest text-foreground/60 sm:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {profile.status.toUpperCase()}
        </motion.span>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-8 py-10 md:grid-cols-3 md:gap-0 md:py-0">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-600">
            {profile.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">
            {profile.shortBio}
          </p>
          <a
            href="#about"
            className="mt-5 inline-block text-sm font-medium text-foreground underline decoration-from-font underline-offset-4"
          >
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[460px] lg:w-[460px]"
          />
          <motion.img
            src={profile.photo}
            alt={`${profile.name} — ${profile.title}`}
            className="relative z-10 h-auto w-56 object-cover md:w-64 lg:w-72"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://placehold.co/400x600/eab308/ffffff?text=${encodeURIComponent(profile.name)}`;
            }}
          />
        </div>

        {/* Right Text — name overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-6xl font-extrabold leading-[0.95] text-foreground md:text-7xl lg:text-8xl">
            Riflan
            <br />
            Mohamed<span className="text-yellow-500">.</span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
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
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-sm font-medium text-foreground/80"
        >
          {profile.location}
        </motion.div>
      </footer>
    </section>
  );
};
