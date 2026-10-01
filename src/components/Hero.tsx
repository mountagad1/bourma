import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { HeroEmblem } from "@/components/hero3d/HeroEmblem";
import { ArrowIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[var(--header-h)]"
    >
      {/* Trame technique discrète en fond */}
      <div aria-hidden="true" className="blueprint absolute inset-y-0 right-0 hidden w-[42%] opacity-70 lg:block" />

      <div className="container-site relative grid items-center gap-10 py-10 sm:py-14 lg:min-h-[min(100svh,58rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-12">
        <div>
          <Logo withSignature className="hero-in h-auto w-[11rem] sm:w-[13.5rem]" />

          <p className="hero-in eyebrow mt-8" style={{ ["--i" as string]: 1 }}>
            Enseignes · Signalétique · Agencement · Fermetures
          </p>

          <h1
            id="hero-title"
            className="hero-in mt-4 font-display text-[clamp(2.75rem,7.2vw,5.75rem)] font-bold uppercase leading-[0.9] tracking-[-0.005em]"
            style={{ ["--i" as string]: 2 }}
          >
            Donnez de la visibilité <span className="text-lime">à votre image.</span>
          </h1>

          <p
            className="hero-in mt-6 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl"
            style={{ ["--i" as string]: 3 }}
          >
            Enseignes, signalétique, agencement et fermetures&nbsp;: Boura Multiservices vous accompagne
            dans vos projets professionnels.
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 4 }}>
            <Link href="/#contact" className="btn btn-primary">
              Demander un devis
              <ArrowIcon className="btn-arrow" />
            </Link>
            <Link href="/#services" className="btn btn-ghost">
              Découvrir nos services
            </Link>
          </div>

          <ul
            className="hero-in mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.975rem] sm:flex-row sm:gap-8"
            style={{ ["--i" as string]: 5 }}
          >
            <li>
              <a href={site.phone.href} className="inline-flex items-center gap-2.5 font-semibold hover:text-lime">
                <PhoneIcon className="text-lime" />
                {site.phone.display}
              </a>
            </li>
            <li className="min-w-0">
              <a href={site.email.href} className="inline-flex items-center gap-2.5 break-all hover:text-lime">
                <MailIcon className="shrink-0 text-lime" />
                {site.email.display}
              </a>
            </li>
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="hero-media relative aspect-square overflow-hidden rounded-[var(--radius)] bg-surface lg:max-h-[calc(100svh-var(--header-h)-6rem)] lg:w-auto">
            <Image
              src="/images/facade-bms-clean.jpg"
              alt="Façade de Boura Multiservices : enseigne en lettres découpées vertes et blanches et panneaux présentant les services"
              fill
              preload
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 34rem, 100vw"
              className="object-cover object-center"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 to-transparent" />
          </div>
          {/* Équerre verte, rappel du toit du logo */}
          <span aria-hidden="true" className="absolute -left-3 -top-3 h-16 w-16 border-l-[5px] border-t-[5px] border-lime" />
          {/* Emblème 3D chargé à la demande, posé sur la façade */}
          <HeroEmblem className="absolute -bottom-8 -left-6 h-[44%] w-[58%] sm:-left-10 lg:-bottom-10 lg:-left-16" />
          <figcaption className="absolute bottom-4 right-4 text-right font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/85">
            Notre façade
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
