"use client";

import { useEffect, useState } from "react";

import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { useScreenSize } from "@/hooks/use-screen-size";

const STORAGE_KEY = "desktop-notice-dismissed";
const COUNTDOWN_FROM = 3;

// Full-screen notice shown only on phones & tablets (< lg): an orbital loader
// plus a disclaimer recommending desktop. A 3-2-1 countdown auto-opens the
// site, or the user can skip with the button. Theme-aware, remembered per session.
export function MobileNotice() {
  const screenSize = useScreenSize();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [count, setCount] = useState(COUNTDOWN_FROM);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const visible = mounted && !dismissed && screenSize.lessThan("lg");

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  // Tick the countdown down once a second; auto-open at zero.
  useEffect(() => {
    if (!visible) return;
    if (count <= 0) {
      dismiss();
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [visible, count]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background px-8 text-center">
      <OrbitalLoader />

      <div className="max-w-sm space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Best viewed on desktop
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This portfolio is crafted with rich animations and a cinematic video
          hero made for larger screens. For the full experience, open it on a PC
          or laptop.
        </p>
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        Opening automatically in{" "}
        <span className="font-semibold tabular-nums text-yellow-500">{count}</span>
        s&hellip;
      </p>

      <button
        type="button"
        onClick={dismiss}
        className="rounded-full bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
      >
        Continue anyway
      </button>
    </div>
  );
}
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
