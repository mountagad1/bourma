import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  AwningIcon,
  BulbIcon,
  GarageDoorIcon,
  ShutterIcon,
  SignpostIcon,
  StoreIcon,
  WrenchIcon,
} from "@/components/icons";
import { services } from "@/content/services";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  enseignes: BulbIcon,
  signaletique: SignpostIcon,
  "agencement-magasin": StoreIcon,
  "stores-bannes": AwningIcon,
  "rideaux-metalliques": ShutterIcon,
  "portes-sectionnelles": GarageDoorIcon,
  maintenance: WrenchIcon,
};

/**
 * Carrousel défilant d'accès rapide aux services, sous le hero.
 * Animation CSS uniquement (transform) ; la seconde copie de la liste ne sert
 * qu'à boucler sans à-coup et est masquée aux lecteurs d'écran et au clavier.
 * Pause au survol / focus ; en mouvement réduit, simple rangée défilable.
 */
export function ServicesIndex() {
  return (
    <nav aria-label="Accès rapide aux services" className="marquee border-y border-white/[0.08] bg-navy-deep">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-group" aria-hidden={copy === 1 || undefined}>
            {services.map((s) => {
              const Icon = icons[s.slug];
              return (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group flex items-center gap-3 rounded-full border border-white/10 bg-navy py-2 pl-2 pr-5 transition-colors hover:border-lime"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime/10 text-lime transition-colors group-hover:bg-lime group-hover:text-lime-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="whitespace-nowrap font-display text-base font-semibold uppercase tracking-[0.08em] text-white/85 group-hover:text-white">
                      {s.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </nav>
  );
}
