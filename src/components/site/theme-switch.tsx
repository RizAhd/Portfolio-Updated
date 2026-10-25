import type { Theme } from '@/hooks/use-theme';

interface ThemeSwitchProps {
  theme: Theme;
  onToggle: () => void;
}

/** Small pill switch pinned to the bottom centre of the screen (on phones it lives in the menu). */
export const ThemeSwitch = ({ theme, onToggle }: ThemeSwitchProps) => {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={onToggle}
      className="fixed bottom-5 left-1/2 z-50 hidden h-6 w-11 -translate-x-1/2 cursor-pointer rounded-full bg-brand p-1 shadow-lg shadow-black/15 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 md:block"
    >
      <span
        className={`block size-4 rounded-full bg-brand-ink transition-transform duration-300 ${dark ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
};
