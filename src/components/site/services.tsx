import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { services } from '@/data/portfolio';
import { Container, SectionHeader } from './primitives';
import { EASE } from './motion';

/** Right half only: on desktop the pinned portrait card occupies the left half. */
export const Services = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="lg:ml-auto lg:w-1/2 lg:pl-8">
          <SectionHeader
            title="What I can do for you"
            intro="As a software engineer, I turn ideas into working products: intelligent, fast and built to last."
          />
          <ul className="mt-10">
            {services.map((service, i) => {
              const on = i === active;
              const id = `service-${i}`;
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
                    aria-expanded={on}
                    aria-controls={id}
                    className={`flex w-full cursor-pointer items-baseline gap-3 py-5 text-left font-display-caps text-[clamp(1.6rem,3vw,2rem)] transition-colors duration-300 ${
                      on ? 'text-brand' : 'text-ink hover:text-brand'
                    }`}
                  >
                    <span>{i + 1}.</span>
                    <span className="flex-1">{service.title}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 shrink-0 self-center transition-transform duration-300 ${on ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.div
                        id={id}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <p className="pb-4 text-[15px] leading-relaxed text-ink-soft">{service.description}</p>
                        <ul className="flex flex-wrap gap-2 pb-6" aria-label="Tools">
                          {service.tools.map((tool) => (
                            <li key={tool} className="rounded-full border border-line bg-soft px-3 py-1 text-xs text-ink-soft">
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
};
