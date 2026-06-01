import { motion } from 'framer-motion';
import { LogoCloud } from '@/components/ui/logo-cloud-4';

// Riflan's known programming languages & technologies, shown as an infinite
// logo marquee. Logos are official devicon SVGs (CDN-verified to resolve).
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const techLogos = [
  { src: `${DEVICON}/java/java-original.svg`, alt: 'Java' },
  { src: `${DEVICON}/javascript/javascript-original.svg`, alt: 'JavaScript' },
  { src: `${DEVICON}/typescript/typescript-original.svg`, alt: 'TypeScript' },
  { src: `${DEVICON}/python/python-original.svg`, alt: 'Python' },
  { src: `${DEVICON}/php/php-original.svg`, alt: 'PHP' },
  { src: `${DEVICON}/html5/html5-original.svg`, alt: 'HTML5' },
  { src: `${DEVICON}/css3/css3-original.svg`, alt: 'CSS3' },
  { src: `${DEVICON}/react/react-original.svg`, alt: 'React' },
  { src: `${DEVICON}/flask/flask-original.svg`, alt: 'Flask' },
  { src: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, alt: 'Tailwind CSS' },
  { src: `${DEVICON}/nodejs/nodejs-original.svg`, alt: 'Node.js' },
  { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' },
  { src: `${DEVICON}/git/git-original.svg`, alt: 'Git' },
];

export const TechMarquee = () => (
  <section
    id="tech"
    className="relative w-full overflow-hidden bg-background py-16 md:py-20"
  >
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="mb-8 px-4 text-center"
    >
      <span className="block text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">
        Languages &amp; Tools
      </span>
      <span className="mt-2 block text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Technologies I work with
      </span>
    </motion.h2>

    <LogoCloud logos={techLogos} />
  </section>
);
