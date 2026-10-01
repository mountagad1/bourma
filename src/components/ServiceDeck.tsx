import Link from "next/link";
import { DeckMotion } from "@/components/DeckMotion";
import { ServiceVisual } from "@/components/ServiceVisual";
import { ArrowIcon } from "@/components/icons";
import { services, type Service } from "@/content/services";

const DECK_ID = "pile-services";

export function ServiceDeck() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div className="reveal">
            <p className="eyebrow">Nos services</p>
            <h2
              id="services-title"
              className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.95]"
            >
              De la façade <span className="text-lime">à l&apos;entretien</span>
            </h2>
          </div>
          <p className="reveal max-w-xl text-lg leading-relaxed text-muted lg:justify-self-end">
            Sept domaines d&apos;intervention pour accompagner vos locaux professionnels&nbsp;: rendre votre
            établissement visible, aménager vos espaces et installer des fermetures fiables.
          </p>
        </div>

        <ol id={DECK_ID} className="deck mt-12 sm:mt-16">
          {services.map((service, i) => (
            <li
              key={service.slug}
              data-deck-item
              className="deck-item"
              style={{ ["--i" as string]: i }}
            >
              <ServiceCard service={service} index={i} total={services.length} />
            </li>
          ))}
        </ol>
        <DeckMotion deckId={DECK_ID} />
      </div>
    </section>
  );
}

function ServiceCard({ service, index, total }: { service: Service; index: number; total: number }) {
  const number = String(index + 1).padStart(2, "0");
  const reversed = index % 2 === 1;
  return (
    <article
      aria-labelledby={`carte-${service.slug}`}
      className="deck-card relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-white/[0.08] bg-surface md:grid md:grid-cols-2"
    >
      <ServiceVisual
        visual={service.visual}
        sizes="(min-width: 768px) 41rem, 100vw"
        className={`min-h-24 flex-1 md:h-full md:min-h-0 ${reversed ? "md:order-2" : ""}`}
      />

      <div className="relative flex flex-col justify-between gap-3 p-5 sm:gap-4 sm:p-8 lg:p-12">
        {/* Numéro en filigrane */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 right-4 select-none font-display text-[clamp(5rem,12vw,10rem)] font-bold leading-none text-white/[0.04]"
        >
          {number}
        </span>

        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          <span className="text-lime">{number}</span> / {String(total).padStart(2, "0")} · {service.label}
        </p>

        <div>
          <h3
            id={`carte-${service.slug}`}
            className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-bold uppercase leading-[0.95]"
          >
            {service.card.title}
          </h3>
          <p className="mt-2.5 max-w-md text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-lg">
            {service.card.description}
          </p>
        </div>

        <Link
          href={`/${service.slug}`}
          className="group inline-flex items-center gap-2 self-start font-display text-lg font-semibold uppercase tracking-[0.06em] text-lime"
        >
          <span className="link-line">En savoir plus</span>
          <span className="sr-only"> sur : {service.card.title}</span>
          <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div aria-hidden="true" className="deck-shade pointer-events-none absolute inset-0 bg-navy-deep" />
    </article>
  );
}
