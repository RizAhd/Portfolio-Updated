import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { services } from '@/data/portfolio';
import { Container, SectionHeader } from './primitives';
import { EASE } from './motion';

export const Services = () => {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeader
            title="What I can do for you"
            intro="As a software engineer, I turn ideas into working products — intelligent, fast and built to last."
          />
          <ul className="mt-10">
            {services.map((service, i) => {
              const on = i === active;
              return (
                <motion.li
                  key={service.title}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={on}
                    className={`flex w-full cursor-pointer items-baseline gap-3 py-5 text-left font-display-caps text-[clamp(1.6rem,3vw,2rem)] transition-colors duration-300 ${
                      on ? 'text-brand' : 'text-ink hover:text-brand'
                    }`}
                  >
                    <span>{i + 1}.</span>
                    <span>{service.title}</span>
                  </button>
                  {/* Phones: the detail opens under the row */}
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.div
                        className="overflow-hidden md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <p className="pb-4 text-[15px] leading-relaxed text-ink-soft">{service.description}</p>
                        <ToolChips tools={service.tools} className="pb-6" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Desktop: the detail card follows the hovered row */}
        <div className="hidden md:block">
          <div className="sticky top-28 overflow-hidden rounded-3xl bg-soft p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="font-display-caps text-[7rem] font-bold leading-none text-brand">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 font-display-caps text-4xl font-semibold text-ink">{current.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{current.description}</p>
                <ToolChips tools={current.tools} className="mt-8" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};

const ToolChips = ({ tools, className = '' }: { tools: string[]; className?: string }) => (
  <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Tools">
    {tools.map((tool) => (
      <li key={tool} className="rounded-full border border-line bg-page px-3 py-1 text-xs text-ink-soft">
        {tool}
      </li>
    ))}
  </ul>
);
