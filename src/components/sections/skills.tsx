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

const firstColumn = cards.slice(0, 3);
const secondColumn = cards.slice(3, 5);
const thirdColumn = cards.slice(5, 7);

export const Skills = () => (
  <section id="skills" className="w-full bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-7xl">
      <SectionHeading kicker="What I Use" title="Skills" />

      <div className="flex justify-center gap-4 sm:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[560px] sm:max-h-[640px] md:max-h-[740px] overflow-hidden">
        <motion.div
          className="w-full max-w-xs"
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
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
