import Image from "next/image";

const photos = [
  {
    src: "/images/facade-bms.jpg",
    position: "50% 36%",
    alt: "Bandeau de façade noir avec lettres découpées blanches et vertes formant « Boura Multiservices »",
    caption: "Enseigne en lettres découpées — façade BMS",
    span: "sm:col-span-2",
  },
  {
    src: "/images/signaletique-panneau.jpg",
    position: "50% 30%",
    alt: "Panneau latéral de façade avec pictogrammes verts pour enseignes, signalétique, agencement et rendez-vous",
    caption: "Panneau de façade — signalétique",
    span: "",
  },
  {
    src: "/images/rideau-metallique.jpg",
    position: "50% 50%",
    alt: "Porte vitrée anthracite devant un rideau métallique abaissé, avec vitrophanie BMS",
    caption: "Porte vitrée, vitrophanie et rideau métallique",
    span: "",
  },
];

export function Gallery() {
  return (
    <section id="realisations" aria-labelledby="realisations-title" className="py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div className="reveal">
            <p className="eyebrow">Réalisations</p>
            <h2
              id="realisations-title"
              className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.95]"
            >
              Notre façade, <span className="text-lime">notre carte de visite</span>
            </h2>
          </div>
          <p className="reveal max-w-xl text-lg leading-relaxed text-muted lg:justify-self-end">
            Enseigne, panneaux, vitrophanie et rideau métallique&nbsp;: notre propre devanture réunit plusieurs de
            nos métiers. Les photos de projets réalisés pour nos clients seront ajoutées prochainement.
          </p>
        </div>

        <ul className="mt-12 grid auto-rows-[16rem] gap-4 sm:grid-cols-2 sm:auto-rows-[18rem] lg:grid-cols-4 lg:auto-rows-[20rem]">
          {photos.map((photo) => (
            <li key={photo.src} className={`reveal ${photo.span}`}>
              <figure className="group relative h-full overflow-hidden rounded-[var(--radius)] bg-surface">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: photo.position }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/95 to-transparent p-4 pt-12 font-display text-sm font-semibold uppercase tracking-[0.1em]">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
          {[1, 2, 3].map((n) => (
            <li key={n} className={`reveal ${n === 3 ? "sm:col-span-2 lg:col-span-2" : ""}`}>
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[var(--radius)] border-2 border-dashed border-white/15 p-6 text-center">
                <svg viewBox="0 0 48 40" className="h-10 w-12 text-lime" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 38V18L24 3l20 15" />
                  <path d="M24 12l6 5H18z" fill="currentColor" stroke="none" />
                </svg>
                <p className="font-display text-lg font-semibold uppercase tracking-[0.08em]">Emplacement photo</p>
                <p className="text-sm text-muted">Réalisation client à venir</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
