import Image from "next/image";
import type { ServiceVisual as Visual } from "@/content/services";
import { ServiceIllustration } from "@/components/ServiceIllustration";

type Props = {
  visual: Visual;
  sizes: string;
  className?: string;
  imgClassName?: string;
  preload?: boolean;
};

/** Photo réelle ou, à défaut, illustration clairement identifiée. */
export function ServiceVisual({ visual, sizes, className = "", imgClassName = "", preload }: Props) {
  if (visual.kind === "photo") {
    return (
      <div className={`relative overflow-hidden bg-surface ${className}`}>
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition: visual.position }}
        />
      </div>
    );
  }

  return (
    <div className={`blueprint relative overflow-hidden ${className}`} role="img" aria-label={visual.alt}>
      <ServiceIllustration motif={visual.motif} className={`absolute inset-[8%] h-[84%] w-[84%] ${imgClassName}`} />
      <span className="absolute bottom-3 right-3 rounded-sm bg-navy/80 px-2 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
        Illustration · photo à venir
      </span>
    </div>
  );
}
