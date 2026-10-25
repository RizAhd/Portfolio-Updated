import { ChevronDown } from 'lucide-react';
import { WhatsappIcon } from '@/components/brand-icons';
import { useState, type FormEvent } from 'react';
import { contact, profile, services } from '@/data/portfolio';
import { Container, PillButton, Reveal, SectionHeader } from './primitives';

const field =
  'w-full rounded-full border border-transparent bg-soft px-5 text-sm text-ink placeholder:text-muted-ink outline-none transition-colors focus:border-brand';
const label = 'mb-2 block text-xs font-medium text-brand';

/** No server behind GitHub Pages: the form opens the visitor's email app with the message ready. */
export const Contact = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const service = String(data.get('service') ?? '');
    const message = String(data.get('message') ?? '').trim();
    const subject = `Project enquiry${service ? `: ${service}` : ''} (from ${name})`;
    const body = `${message}\n\nFrom ${name}\n${email}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <Container className="grid items-center gap-16 md:grid-cols-2">
        <Reveal className="relative mx-auto w-[min(70vw,20rem)] md:w-[min(100%,21rem)]">
          <div className="aspect-[5/7] overflow-hidden rounded-2xl bg-soft shadow-2xl shadow-black/10">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
              className="size-full object-cover object-[50%_22%]"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeader
            title="Let's work together"
            intro="Let's build something impactful together, whether it's an AI product, a web or mobile app, or your next big idea."
          />
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className={label}>
                    Name
                  </label>
                  <input id="c-name" name="name" required autoComplete="name" placeholder="Your name" className={`${field} h-11`} />
                </div>
                <div>
                  <label htmlFor="c-email" className={label}>
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${field} h-11`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="c-service" className={label}>
                  Service needed ?
                </label>
                <div className="relative">
                  <select id="c-service" name="service" defaultValue="" className={`${field} h-11 cursor-pointer appearance-none pr-10`}>
                    <option value="">Select…</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Job opportunity">Job opportunity</option>
                    <option value="Something else">Something else</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-ink" />
                </div>
              </div>
              <div>
                <label htmlFor="c-message" className={label}>
                  What can I help you with?
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Hi Riflan, I'd like to talk about…"
                  className={`${field} resize-y rounded-2xl py-4`}
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <PillButton type="submit">Submit</PillButton>
                {sent ? (
                  <p className="text-sm text-muted-ink" aria-live="polite">
                    Your email app should now open with the message ready to send.
                  </p>
                ) : (
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    <WhatsappIcon className="size-4" />
                    Or chat on WhatsApp
                  </a>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
