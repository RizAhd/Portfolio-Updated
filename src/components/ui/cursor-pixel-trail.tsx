import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

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
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
