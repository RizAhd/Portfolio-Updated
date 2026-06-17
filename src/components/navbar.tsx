import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { navLinks } from '@/data/portfolio';
import type { Theme } from '@/hooks/use-theme';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={cn(
          'flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-colors duration-300 sm:px-6',
          scrolled
            ? 'border-border bg-background/70 shadow-lg shadow-black/5'
            : 'border-white/10 bg-background/30'
        )}
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-lg font-bold tracking-wider text-foreground sm:text-xl"
        >
          riflan<span className="text-yellow-500">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative inline-block py-1 text-xs font-medium tracking-widest text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-yellow-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-background/80 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-24 flex max-h-[calc(100dvh-7rem)] w-full max-w-sm flex-col items-center gap-2 overflow-y-auto px-6 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-xl border border-border bg-card/60 px-5 py-4 text-center text-sm font-semibold tracking-widest text-foreground transition-colors hover:border-yellow-500/60 hover:text-yellow-600"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
