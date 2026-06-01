import { motion } from 'framer-motion';

// Shared section heading: a small kicker label + large title, used across
// every section so the page reads consistently.
export const SectionHeading = ({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5 }}
    className="mb-12 flex flex-col gap-2"
  >
    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-600">
      {kicker}
    </span>
    <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
      {title}
    </h2>
  </motion.div>
);
