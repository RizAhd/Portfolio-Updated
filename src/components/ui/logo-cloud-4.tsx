import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <div className="relative w-full py-6">
      <InfiniteSlider gap={48} reverse duration={32} durationOnHover={120}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            title={logo.alt}
            className="pointer-events-none h-8 w-auto select-none md:h-10"
            key={`logo-${logo.alt}`}
            loading="lazy"
            decoding="async"
            src={logo.src}
          />
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[15vw] min-w-[80px] max-w-[280px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[15vw] min-w-[80px] max-w-[280px]"
        direction="right"
      />
    </div>
  );
}
