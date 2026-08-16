"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadCvButtonProps {
  href: string;
  /** Filename the browser saves as. */
  fileName: string;
  label?: string;
  className?: string;
}

/**
 * Outlined pill that fills with the site accent on hover while the arrow
 * dips, as if dropping the file. Falls back to a plain colour swap when the
 * visitor prefers reduced motion.
 */
export const DownloadCvButton = ({
  href,
  fileName,
  label = 'Download CV',
  className,
}: DownloadCvButtonProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={href}
      download={fileName}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={reduce ? undefined : { scale: 0.96 }}
      aria-label={`${label} (PDF)`}
      className={cn(
        'group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full',
        'border border-yellow-500/60 px-4 py-1.5 text-xs font-semibold tracking-wide',
        'text-foreground outline-none hover:border-yellow-500',
        'focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-background',
        className
      )}
    >
      <motion.span
        aria-hidden
        variants={reduce ? undefined : { rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'absolute inset-0 origin-left bg-yellow-500',
          // With variants disabled nothing would set the resting transform, so
          // the fill would sit permanently over the label. Drive it with CSS.
          reduce && 'scale-x-0 transition-transform duration-200 group-hover:scale-x-100'
        )}
      />

      <motion.span
        aria-hidden
        variants={reduce ? undefined : { rest: { y: 0 }, hover: { y: [0, 3, 0] } }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative z-10 flex transition-colors duration-300 group-hover:text-black"
      >
        <Download className="h-3.5 w-3.5" />
      </motion.span>

      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {label}
      </span>
    </motion.a>
  );
};
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
