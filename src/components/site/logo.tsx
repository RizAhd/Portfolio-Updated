import type { SVGProps } from 'react';

/** The "R" mark (traced from public/R-Icon.png); takes the current text colour. */
export const Logo = ({ title = 'Riflan Mohamed', ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
  <svg viewBox="120 66 1010 1116" role="img" aria-label={title} {...props}>
    <path
      fill="currentColor"
      d="M134 80H1084V358L698 691L1115 1168H815L515 842L134 1168V862L803 311H370V552L134 745Z"
    />
  </svg>
);
