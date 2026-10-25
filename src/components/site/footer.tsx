import { GithubIcon, LinkedinIcon, WhatsappIcon } from '@/components/brand-icons';
import { contact, profile } from '@/data/portfolio';
import { Logo } from './logo';
import { Container } from './primitives';

export const Footer = () => (
  <footer className="relative z-10 bg-brand pt-14 pb-20 text-brand-ink">
    <Container>
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-sm opacity-80">Email :</p>
          <a href={`mailto:${contact.email}`} className="mt-1 block break-all text-lg font-semibold hover:underline">
            {contact.email}
          </a>
        </div>
        <div>
          <p className="text-sm opacity-80">Role :</p>
          <p className="mt-1 text-lg font-semibold">Software Engineer & AI Engineer</p>
        </div>
        <div className="sm:justify-self-end">
          <p className="text-sm opacity-80">Social :</p>
          <div className="mt-2 flex gap-3">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:bg-brand-ink hover:text-brand"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:bg-brand-ink hover:text-brand"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:bg-brand-ink hover:text-brand"
            >
              <WhatsappIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-current/25 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {profile.year} {profile.name}. All rights reserved.
        </p>
        <a href="#home" className="flex items-center gap-2 hover:underline">
          <span className="grid size-7 place-items-center rounded-full bg-brand-ink text-brand">
            <Logo aria-hidden="true" className="h-3 w-auto" />
          </span>
          Back to top
        </a>
      </div>
    </Container>
  </footer>
);
