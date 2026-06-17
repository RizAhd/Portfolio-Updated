import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

/**
 * Site-wide gooey pixel-trail cursor effect. Renders a fixed, full-viewport
 * overlay that floats above all content but never blocks interaction
 * (pointer-events: none) and follows the real cursor via a window listener.
 *
 * Disabled below `md` — it's a pointer-device effect and skipping it keeps
 * touch devices from mounting a large idle pixel grid.
 */
export const CursorPixelTrail = () => {
  const screenSize = useScreenSize()

  if (screenSize.lessThan("md")) return null

  return (
    <>
      <GooeyFilter id="cursor-goo" strength={5} />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{ filter: "url(#cursor-goo)" }}
      >
        <PixelTrail
          global
          pixelSize={screenSize.lessThan("lg") ? 24 : 28}
          fadeDuration={420}
          delay={0}
          pixelClassName="bg-yellow-400"
        />
      </div>
    </>
  )
}
