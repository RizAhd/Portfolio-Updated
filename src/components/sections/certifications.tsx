import { motion } from 'framer-motion';
import CardFanCarousel from '@/components/ui/card-fan-carousel';
import { certifications } from '@/data/portfolio';

// The carousel only renders artwork, so the readable title/issuer/date lives in
// the legend below (and in each card's alt text for assistive tech).
const CARDS = certifications.map((c) => ({
  imgUrl: c.image,
  alt: c.date ? `${c.title} — ${c.issuer} (${c.date})` : `${c.title} — ${c.issuer}`,
}));

export const Certifications = () => (
  <section
    id="certifications"
    className="w-full overflow-x-clip bg-background px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:px-12"
  >
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 sm:text-sm">
        Credentials
      </p>
      <h2 className="mt-2 text-[clamp(1.875rem,7vw,3rem)] font-extrabold tracking-tight text-foreground">
        Certifications<span className="text-yellow-500">.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
        Hover to spread the deck — use the arrows to page through all{' '}
        {certifications.length}.
      </p>
    </div>

    <CardFanCarousel cards={CARDS} />

    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-10 grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {certifications.map((c) => (
        <li key={c.title}>
          <a
            href={c.image}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-colors hover:border-yellow-500/60"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-yellow-600">
              {c.issuer}
            </span>
            <span className="text-sm font-semibold leading-snug text-foreground">
              {c.title}
            </span>
            {c.date && (
              <span className="mt-auto pt-1 text-xs text-muted-foreground">
                {c.date}
              </span>
            )}
          </a>
        </li>
      ))}
    </motion.ul>
  </section>
);
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
