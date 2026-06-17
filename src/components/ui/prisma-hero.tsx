import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";
import { useScreenSize } from "@/hooks/use-screen-size";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex max-w-full flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
// Design accent (cream). Kept explicit instead of the theme `primary` token,
// which flips black/white between light & dark and would break the CTA on a
// hero that always sits on a dark image.
const CREAM = "#E1E0CC";

// Source background video — the 3D figure animation from the component.
const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const PrismaHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const screenSize = useScreenSize();
  // Skip the heavy background video on phones (big load/UX win); show the
  // gradient base instead. Desktop gets the video, faded in once it can play.
  const showVideo = !screenSize.lessThan("md");
  useParallaxScroll(videoRef);

  return (
    <section id="home" className="relative h-screen w-full">
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#1c1610] via-black to-[#06060a]">

        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            src={HERO_VIDEO}
          />
        )}

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Hero content (site navbar is the global fixed one, so no nav here) */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10 md:pb-6">
          <div className="grid grid-cols-12 items-end gap-4">

            <div className="col-span-12 min-w-0 lg:col-span-8">
              <h1
                className="break-words font-medium leading-[0.85] tracking-[-0.07em] text-[clamp(2.75rem,21vw,5rem)] sm:text-[20vw] md:text-[17vw] lg:text-[14vw] xl:text-[13vw]"
                style={{ color: CREAM }}
              >
                <WordsPullUp text="Riflan Mohamed" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-4 pb-6 lg:col-span-4 lg:pb-10">

              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs"
                style={{ color: CREAM }}
              >
                {profile.tagline}
              </motion.span>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base"
                style={{ color: "rgba(225, 224, 204, 0.7)", lineHeight: 1.4 }}
              >
                {profile.shortBio}
              </motion.p>

              <motion.a
                href="#projects"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                style={{ backgroundColor: CREAM }}
              >
                View my work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: CREAM }} />
                </span>
              </motion.a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
