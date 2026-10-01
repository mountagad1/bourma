import Image from "next/image";
import { CalendarIcon, CheckIcon } from "@/components/icons";
import { site } from "@/lib/site";

const savoirFaire = ["Pose", "Maintenance", "Store banne", "Rideau métallique", "Porte sectionnelle"];

export function About() {
  return (
    <section id="entreprise" aria-labelledby="entreprise-title" className="blueprint py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal">L&apos;entreprise</p>
          <h2
            id="entreprise-title"
            className="reveal mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.95]"
          >
            Un interlocuteur <span className="text-lime">pour l&apos;ensemble de votre devanture</span>
          </h2>
          <div className="reveal mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Boura Multiservices (BMS) accompagne les commerces et les professionnels dans tout ce qui fait
              l&apos;image et le bon fonctionnement de leurs locaux&nbsp;: enseignes lumineuses et non lumineuses,
              signalétique intérieure et extérieure, agencement de magasins, stores bannes et fermetures.
            </p>
            <p>
              L&apos;entreprise est installée au {site.address.street}, au Mans. Regrouper ces métiers permet de traiter votre projet de façon cohérente, de la conception de
              l&apos;enseigne jusqu&apos;à l&apos;installation et à la maintenance des équipements.
            </p>
          </div>

          <div className="reveal mt-10 flex items-start gap-4 rounded-[var(--radius)] border border-white/10 bg-navy/70 p-5 sm:p-6">
            <CalendarIcon className="mt-0.5 h-7 w-7 shrink-0 text-lime" />
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-[0.04em]">Sur rendez-vous</h3>
              <p className="mt-1 text-muted">
                Prenez rendez-vous par téléphone au{" "}
                <a href={site.phone.href} className="font-semibold text-white hover:text-lime">
                  {site.phone.display}
                </a>{" "}
                ou par e-mail à{" "}
                <a href={site.email.href} className="break-all font-semibold text-white hover:text-lime">
                  {site.email.display}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-[auto_1fr] lg:grid-cols-1 xl:grid-cols-[auto_1fr]">
          <div className="reveal rounded-[var(--radius)] border border-white/10 bg-navy p-7 sm:p-8">
            <h3 className="eyebrow">Savoir-faire</h3>
            <ul className="mt-5 space-y-3.5 font-display text-2xl font-bold uppercase leading-tight tracking-[0.02em]">
              {savoirFaire.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon className="h-6 w-6 shrink-0 text-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal relative mx-auto aspect-[38/94] w-44 overflow-hidden rounded-[var(--radius)] sm:w-48 xl:w-44">
            <Image
              src="/images/panneau-services.jpg"
              alt="Panneau de façade BMS listant pose, maintenance, store banne, rideau métallique et porte sectionnelle"
              fill
              sizes="12rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
