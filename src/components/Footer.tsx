import Link from "next/link";
import { Logo } from "@/components/Logo";
import { services } from "@/content/services";
import { formattedAddress, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-navy py-14">
      <div className="container-site grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Boura Multiservices — accueil" className="inline-block">
            <Logo withSignature decorative className="h-auto w-40" />
          </Link>
          <p className="mt-5 max-w-xs font-display text-lg font-semibold uppercase leading-snug tracking-[0.04em]">
            Donnons visibilité <span className="text-lime">à votre image&nbsp;!</span>
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className="eyebrow">Services</h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-white">
                  {s.card.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-4 grid gap-3">
            <li>
              <a href={site.phone.href} className="font-display text-2xl font-bold tracking-[0.04em] hover:text-lime">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={site.email.href} className="break-all text-muted hover:text-white">
                {site.email.display}
              </a>
            </li>
            <li>
              <address className="not-italic text-muted">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
            </li>
            <li className="text-sm text-muted">Rendez-vous par e-mail ou téléphone.</li>
          </ul>
          <Link href="/#contact" className="btn btn-primary mt-6">
            Demander un devis
          </Link>
        </div>
      </div>
      <div className="container-site mt-12 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Tous droits réservés. SIRET {site.legal.siret}.
        </p>
        <p className="flex flex-wrap gap-x-4">
          <span className="sr-only">Adresse : {formattedAddress}.</span>
          <Link href="/mentions-legales" className="link-line hover:text-white">
            Mentions légales
          </Link>
        </p>
      </div>
    </footer>
  );
}
