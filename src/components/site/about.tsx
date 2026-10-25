import { motion } from 'framer-motion';
import { certifications, contact, languages, profile, projects, skillGroups } from '@/data/portfolio';
import { Container, CountUp, PillLink, Reveal, SectionHeader } from './primitives';
import { EASE } from './motion';

const programmingLanguages = skillGroups.find((g) => g.category === 'Programming Languages')?.items.length ?? 0;

const stats = [
  { value: projects.length, label: 'Projects Shipped' },
  { value: certifications.length, label: 'Certifications' },
  { value: programmingLanguages, label: 'Languages I Code In', suffix: '+' },
];

/** Left half only: on desktop the pinned portrait card occupies the right half. */
export const About = () => (
  <section id="about" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <div className="lg:w-1/2 lg:pr-8">
        <SectionHeader
          title="About me"
          intro="Hi, I'm Riflan — a software engineer and AI engineer building scalable, data-driven applications and intelligent AI solutions."
        />
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            I work across Java, Python, TypeScript and PHP, ship web and mobile apps with React and React Native, build AI
            products with Flask, OpenAI and Pinecone, and automate workflows with n8n, Zapier and Make.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 grid max-w-md grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display-caps text-[clamp(3rem,6vw,3.75rem)] font-semibold text-brand">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-10 grid max-w-md gap-6 text-sm sm:grid-cols-2">
          <div>
            <p className="font-semibold text-ink">Email :</p>
            <a href={`mailto:${contact.email}`} className="mt-1 block break-all text-ink-soft hover:text-brand">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="font-semibold text-ink">LinkedIn :</p>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="mt-1 block text-ink-soft hover:text-brand">
              linkedin.com/in/riflan
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 max-w-md">
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </div>
          <p className="mt-6 text-sm font-semibold text-ink">Languages I speak :</p>
          <ul className="mt-3 space-y-4">
            {languages.map((lang, i) => (
              <li key={lang.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-ink">{lang.name}</span>
                  <span className="text-muted-ink">{lang.level}</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="h-full rounded-full bg-brand"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: EASE }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <PillLink href="/Riflan_Mohamed_CV_AI_Engineer.pdf" download="Riflan_Mohamed_CV_AI_Engineer.pdf">
            Download CV
          </PillLink>
        </Reveal>
      </div>
    </Container>
  </section>
);
