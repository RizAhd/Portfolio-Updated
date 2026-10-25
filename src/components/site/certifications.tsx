import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { certifications, type CertificationItem } from '@/data/portfolio';
import { Container, CountUp, PillButton, SectionHeader } from './primitives';
import { EASE } from './motion';

const thisYear = certifications.filter((c) => c.date?.includes('2026')).length;
const issuers = new Set(certifications.map((c) => c.issuer)).size;

/** Shown before "See all": the four newest certificates around the two stat cards. */
const FEATURED = 4;

export const Certifications = () => {
  const [open, setOpen] = useState<CertificationItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [a, b, c, d] = certifications;
  const more = certifications.slice(FEATURED);

  const cells: ReactNode[] = [
    <CertCard key={a.title} cert={a} onOpen={setOpen} />,
    <CertCard key={b.title} cert={b} onOpen={setOpen} />,
    <StatCard key="total" tone="inverse" caption={`Certified by ${issuers} organisations across AI, cloud and automation`} value={certifications.length} label="Certifications" />,
    <StatCard key="year" tone="brand" caption="Still learning: the latest is from August 2026" value={thisYear} label="Earned this year" />,
    <CertCard key={c.title} cert={c} onOpen={setOpen} />,
    <CertCard key={d.title} cert={d} onOpen={setOpen} />,
  ];

  return (
    <section id="certifications" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader
          title="Certified & always learning"
          intro="Courses and certifications that keep my skills current, from machine learning and cloud to AI engineering and automation."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((cell, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
            >
              {cell}
            </motion.li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {showAll ? (
            <motion.ul
              id="more-certifications"
              className="grid gap-4 overflow-hidden pt-4 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {more.map((cert) => (
                <li key={cert.title}>
                  <CertCard cert={cert} onOpen={setOpen} />
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <PillButton onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} aria-controls="more-certifications">
            {showAll ? 'Show fewer' : `See all ${certifications.length} certifications`}
          </PillButton>
        </div>
      </Container>

      <Lightbox cert={open} onClose={() => setOpen(null)} />
    </section>
  );
};

const CertCard = ({ cert, onOpen }: { cert: CertificationItem; onOpen: (c: CertificationItem) => void }) => (
  <button
    type="button"
    onClick={() => onOpen(cert)}
    className="group flex h-full min-h-60 w-full cursor-pointer flex-col justify-between rounded-2xl bg-soft p-6 text-left transition-colors hover:bg-line/60"
  >
    <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-page">
      <img
        src={cert.image}
        alt=""
        loading="lazy"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div className="mt-5">
      <p className="text-[15px] font-semibold leading-snug text-ink">{cert.title}</p>
      <p className="mt-1 text-sm text-muted-ink">
        {cert.issuer}
        {cert.date ? ` · ${cert.date}` : ''}
      </p>
    </div>
  </button>
);

interface StatCardProps {
  tone: 'inverse' | 'brand';
  caption: string;
  value: number;
  label: string;
}

const StatCard = ({ tone, caption, value, label }: StatCardProps) => (
  <div
    className={`flex h-full min-h-60 flex-col justify-between rounded-2xl p-6 ${
      tone === 'brand' ? 'bg-brand text-brand-ink' : 'bg-panel text-panel-ink'
    }`}
  >
    <p className="max-w-[16rem] text-[15px] leading-snug">{caption}</p>
    <div>
      <p className="font-display-caps text-7xl font-bold">
        <CountUp value={value} />
      </p>
      <p className="mt-1 text-sm">{label}</p>
    </div>
  </div>
);

const Lightbox = ({ cert, onClose }: { cert: CertificationItem | null; onClose: () => void }) => {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={cert.title}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.figure
            className="relative w-full max-w-3xl"
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={cert.image} alt={`${cert.title} certificate`} className="w-full rounded-2xl bg-white shadow-2xl" />
            <figcaption className="mt-4 text-center text-sm text-white/85">
              {cert.title}, {cert.issuer}
              {cert.date ? `, ${cert.date}` : ''}
            </figcaption>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Close"
              className="absolute -top-3 -right-3 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-[#303030] shadow-lg"
            >
              <X className="size-5" />
            </button>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
