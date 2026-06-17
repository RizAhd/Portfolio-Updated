"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, X } from "lucide-react";

import { navLinks, contact } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

const MENU_SLIDE_ANIMATION: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

interface NavLinkProps {
  heading: string;
  href: string;
  index: number;
  onClose: () => void;
}

const NavLink = ({ heading, href, index, onClose }: NavLinkProps) => {
  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center border-b border-border py-4 uppercase"
    >
      <a href={href} onClick={onClose} className="block w-full">
        <div className="relative flex items-start">
          <span className="mr-3 text-xl font-thin text-muted-foreground">{index}.</span>
          <motion.span
            variants={{ initial: { x: 0 }, whileHover: { x: -10 } }}
            transition={{ type: "spring", staggerChildren: 0.04, delayChildren: 0.1 }}
            className="block text-3xl font-extralight text-foreground transition-colors duration-300 group-hover:text-yellow-500"
          >
            {heading.split("").map((letter, i) => (
              <motion.span
                key={i}
                variants={{ initial: { x: 0 }, whileHover: { x: 10 } }}
                transition={{ type: "spring" }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </a>
    </motion.div>
  );
};

const MenuFooter = () => (
  <div className="flex w-full items-center gap-4 border-t border-border px-6 py-5 text-foreground">
    <a
      href={contact.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="-m-2.5 inline-flex items-center justify-center p-2.5"
    >
      <GithubIcon className="h-5 w-5 transition-opacity hover:opacity-60" />
    </a>
    <a
      href={contact.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="-m-2.5 inline-flex items-center justify-center p-2.5"
    >
      <LinkedinIcon className="h-5 w-5 transition-opacity hover:opacity-60" />
    </a>
    <a
      href={`mailto:${contact.email}`}
      aria-label="Email"
      className="-m-2.5 inline-flex items-center justify-center p-2.5"
    >
      <Mail className="h-5 w-5 transition-opacity hover:opacity-60" />
    </a>
  </div>
);

const Curve = () => {
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  const initialPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  const curve: Variants = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <svg className="absolute top-0 -left-[99px] h-full w-[100px] fill-background stroke-none">
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

interface CurvedMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function CurvedMobileMenu({ open, onClose }: CurvedMobileMenuProps) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
          <motion.div
            variants={MENU_SLIDE_ANIMATION}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 z-40 h-[100dvh] w-[82vw] max-w-sm bg-background md:hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-full flex-col justify-between pt-20">
              <div className="px-8">
                <div className="mb-3 border-b border-border pb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Navigation
                </div>
                <nav>
                  {navLinks.map((item, index) => (
                    <NavLink
                      key={item.href}
                      heading={item.label}
                      href={item.href}
                      index={index + 1}
                      onClose={onClose}
                    />
                  ))}
                </nav>
              </div>
              <MenuFooter />
            </div>
            <Curve />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
