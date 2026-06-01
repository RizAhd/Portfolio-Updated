import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import { profile, contact } from '@/data/portfolio';

const links = [
  { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/RizAhd', href: contact.github },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/riflan', href: contact.linkedin },
];

export const Contact = () => (
  <section id="contact" className="w-full bg-background px-6 py-24 md:px-12 md:py-32">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-600">
          Get In Touch
        </span>
        <h2 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          Let&apos;s build something together
          <span className="text-yellow-500">.</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70">
          {profile.status} — open to internships and collaborations in software
          engineering, AI, and full-stack development.
        </p>

        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          Say Hello
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-yellow-500/60"
          >
            <div className="flex items-center gap-3">
              <link.icon className="h-5 w-5 text-yellow-600" />
              <div className="text-left">
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {link.label}
                </div>
                <div className="text-sm font-medium text-foreground">{link.value}</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </motion.a>
        ))}
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
        <span>
          © {profile.year} {profile.name}. All rights reserved.
        </span>
        <span>Designed &amp; built in {profile.location}.</span>
      </footer>
    </div>
  </section>
);
