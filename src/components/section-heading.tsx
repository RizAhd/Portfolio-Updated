import { motion } from 'framer-motion';

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
    className="mb-8 flex flex-col gap-2 sm:mb-12"
  >
    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-600 sm:text-xs sm:tracking-[0.25em]">
      {kicker}
    </span>
    <h2 className="text-[clamp(1.875rem,7vw,3rem)] font-extrabold leading-tight tracking-tight text-balance text-foreground">
      {title}
    </h2>
  </motion.div>
);
