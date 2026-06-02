import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { experience, languages } from '@/data/portfolio';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export const Resume = () => (
  <section id="resume" className="w-full bg-secondary px-6 py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-7xl">
      <SectionHeading kicker="Background" title="Experience & Languages" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {}
        <div className="lg:col-span-2">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Experience
          </h3>
          <div className="space-y-6">
            {experience.map((item) => (
              <motion.div
                key={`${item.company}-${item.role}`}
                {...fadeUp}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-lg font-bold text-foreground">{item.role}</h4>
                  <span className="text-xs font-medium uppercase tracking-widest text-yellow-600">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground/70">{item.company}</p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/70"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-12">
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <motion.div key={lang.name} {...fadeUp} transition={{ duration: 0.5 }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.level}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-yellow-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
