import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { contact, navLinks, profile } from '@/data/portfolio';
import { WhatsappIcon } from '@/components/brand-icons';
import type { Theme } from '@/hooks/use-theme';
import { Logo } from './logo';
import { ThemeSwitch } from './theme-switch';
import { EASE } from './motion';

const CV = { href: '/Riflan_Mohamed_CV_AI_Engineer.pdf', file: 'Riflan_Mohamed_CV_AI_Engineer.pdf' };

interface NavProps {
  theme: Theme;
  onToggleTheme: () => void;
}

/** Floating pill navigation; folds into an "available for work" pill once you scroll (always, on phones). */
export const Nav = ({ theme, onToggleTheme }: NavProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [peek, setPeek] = useState(false);
  const compact = scrolled && !peek;
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-5">
      {/* Desktop: full menu at the top; after scrolling it folds into an "available" pill that reopens on hover */}
      <motion.nav
        layout
        aria-label="Primary"
        onMouseEnter={() => setPeek(true)}
        onMouseLeave={() => setPeek(false)}
        onFocus={() => setPeek(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPeek(false)}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, layout: { duration: 0.45, ease: EASE } }}
        style={{ borderRadius: 999 }}
        className="hidden items-center gap-1 overflow-hidden border border-line bg-nav p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl md:flex"
      >
        <motion.a layout="position" href="#home" className="shrink-0" aria-label={`${profile.name}, home`}>
          <span className="grid size-9 place-items-center rounded-full bg-inverse text-inverse-ink">
            <Logo aria-hidden="true" className="h-4 w-auto" />
          </span>
        </motion.a>
        <AnimatePresence mode="popLayout" initial={false}>
          {compact ? (
            <motion.a
              key="status"
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 pr-4 pl-3 text-sm whitespace-nowrap text-ink-soft"
            >
              {profile.status}
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            </motion.a>
          ) : (
            <motion.div
              key="links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3 flex items-center gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-4 rounded-full bg-inverse px-6 py-2.5 text-sm font-medium whitespace-nowrap text-inverse-ink transition-transform hover:-translate-y-px"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.span layout="position" className="ml-1 flex items-center pr-1.5">
          <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
        </motion.span>
      </motion.nav>

      {/* Phones */}
      <div className="w-full max-w-sm md:hidden">
        <div className="flex items-center gap-2.5 rounded-full border border-line bg-nav p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl">
          <a href="#home" aria-label={`${profile.name}, home`} onClick={() => setOpen(false)}>
            <span className="grid size-10 place-items-center rounded-full bg-inverse text-inverse-ink">
              <Logo aria-hidden="true" className="h-[18px] w-auto" />
            </span>
          </a>
          <span className="flex min-w-0 flex-1 items-center gap-2 text-[15px] whitespace-nowrap text-ink-soft">
            <span className="min-[360px]:hidden">Available</span>
            <span className="hidden min-[360px]:inline">{profile.status}</span>
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
          </span>
          <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full bg-brand text-brand-ink"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? 'top-1 -rotate-45' : 'top-2'}`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              id="mobile-menu"
              aria-label="Primary"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-2 rounded-3xl border border-line bg-nav p-3 shadow-xl shadow-black/10 backdrop-blur-xl"
            >
              {[...navLinks, { label: 'Contact', href: '#contact' }].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display-caps text-2xl text-ink transition-colors hover:bg-soft"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-line px-1 pt-3">
                <a
                  href={CV.href}
                  download={CV.file}
                  className="flex-1 rounded-full bg-inverse px-4 py-2.5 text-center text-sm font-medium text-inverse-ink"
                >
                  Download CV
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-ink"
                >
                  <WhatsappIcon className="size-4" />
                  WhatsApp
                </a>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
