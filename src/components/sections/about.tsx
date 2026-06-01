import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import StackFeatureSection from '@/components/ui/stack-feature-section';
import { profile, stats, contact, skillGroups } from '@/data/portfolio';

// Initials for the orbit hub, from the real profile name.
const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

// Orbit chips: a representative spread of the real tech stack (one or two items
// from each skill group), so the animation shows what Riflan actually works in.
const orbitStack = skillGroups.flatMap((g) => g.items.slice(0, 3)).slice(0, 15);

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

      {/* Orbiting tech-stack feature — real bio + real stack from portfolio data. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mt-16"
      >
        <StackFeatureSection
          heading="Build with me"
          description={profile.shortBio}
          ctaLabel="View my GitHub"
          ctaHref={contact.github}
          secondaryLabel="Get in touch"
          secondaryHref="#contact"
          centerLabel={initials}
          items={orbitStack}
        />
      </motion.div>
    </div>
  </section>
);
