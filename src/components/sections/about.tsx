import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { profile, stats } from '@/data/portfolio';

export const About = () => (
  <section id="about" className="w-full bg-background px-6 py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-7xl">
      <SectionHeading kicker="Who I Am" title="About" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-lg leading-relaxed text-foreground/80 lg:col-span-2"
        >
          {profile.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 lg:grid-cols-1"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="text-3xl font-extrabold text-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);
