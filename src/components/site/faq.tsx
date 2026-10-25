import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '@/data/portfolio';
import { Container, SectionHeader } from './primitives';
import { EASE } from './motion';

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        <SectionHeader
          title="Frequently asked questions"
          intro="Answers to the questions I hear most. Can't find yours? Reach out, I'm happy to help."
          className="md:sticky md:top-28 md:self-start"
        />
        <ul>
          {faqs.map((item, i) => {
            const on = open === i;
            const id = `faq-${i}`;
            return (
              <motion.li
                key={item.question}
                className="border-b border-line"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  aria-controls={id}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-display-caps text-[1.45rem] transition-colors sm:text-2xl ${on ? 'text-brand' : 'text-ink'}`}>
                    {i + 1}. {item.question}
                  </span>
                  <Plus
                    className={`mt-1 size-5 shrink-0 transition-transform duration-300 ${on ? 'rotate-45 text-brand' : 'text-muted-ink'}`}
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
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-ink-soft">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};
