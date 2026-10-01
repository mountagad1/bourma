import Link from "next/link";
import { services } from "@/content/services";

/** Bandeau d'accès rapide aux pages services, juste sous le hero. */
export function ServicesIndex() {
  return (
    <nav aria-label="Accès rapide aux services" className="border-y border-white/[0.08] bg-navy-deep">
      <ul className="container-site flex flex-wrap items-center gap-x-1 gap-y-1 py-4 font-display text-[0.95rem] font-semibold uppercase tracking-[0.1em] sm:text-base">
        {services.map((s, i) => (
          <li key={s.slug} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="px-1.5 text-lime">
                /
              </span>
            )}
            <Link href={`/${s.slug}`} className="inline-block py-1.5 text-white/80 transition-colors hover:text-lime">
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
