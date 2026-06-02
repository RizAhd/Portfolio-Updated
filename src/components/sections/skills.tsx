import { motion } from 'framer-motion';
import {
  Code2,
  Boxes,
  BrainCircuit,
  Database,
  Radio,
  Workflow,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { TestimonialsColumn, type ColumnCard } from '@/components/ui/testimonials-columns-1';
import { skillGroups } from '@/data/portfolio';

const categoryIcons: LucideIcon[] = [
  Code2,
  Boxes,
  BrainCircuit,
  Database,
  Radio,
  Workflow,
  Sparkles,
];

const cards: ColumnCard[] = skillGroups.map((group, i) => ({
  text: group.items.join(' · '),
  name: group.category,
  role: `${group.items.length} ${group.items.length === 1 ? 'skill' : 'skills'}`,
  icon: categoryIcons[i % categoryIcons.length],
}));

// Split 7 groups across three columns (3 / 2 / 2) for the marquee.
const firstColumn = cards.slice(0, 3);
const secondColumn = cards.slice(3, 5);
const thirdColumn = cards.slice(5, 7);

export const Skills = () => (
  <section id="skills" className="w-full bg-background px-6 py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-7xl">
      <SectionHeading kicker="What I Use" title="Skills" />

      <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
        </motion.div>
        <TestimonialsColumn
          testimonials={secondColumn}
          className="hidden md:block"
          duration={19}
        />
        <TestimonialsColumn
          testimonials={thirdColumn}
          className="hidden lg:block"
          duration={17}
        />
      </div>
    </div>
  </section>
);
