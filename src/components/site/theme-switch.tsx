import { Moon, Sun } from 'lucide-react';
import type { Theme } from '@/hooks/use-theme';

interface ThemeSwitchProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

/** Light / dark switch for the navigation bars; the knob carries a sun or a moon. */
export const ThemeSwitch = ({ theme, onToggle, className = '' }: ThemeSwitchProps) => {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={onToggle}
      className={`relative h-7 w-[3.25rem] shrink-0 cursor-pointer rounded-full bg-brand p-1 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}
    >
      <span
        className={`grid size-5 place-items-center rounded-full bg-brand-ink text-brand transition-transform duration-300 ${
          dark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {dark ? <Moon className="size-3" strokeWidth={2.5} /> : <Sun className="size-3" strokeWidth={2.5} />}
      </span>
    </button>
  );
};
