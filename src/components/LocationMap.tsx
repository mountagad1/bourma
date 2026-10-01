"use client";

import { useState } from "react";
import { ArrowIcon, PinIcon } from "@/components/icons";
import { formattedAddress, site } from "@/lib/site";

const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${formattedAddress}, France`)}&z=17&hl=fr&output=embed`;

/**
 * Carte Google Maps chargée uniquement à la demande du visiteur :
 * aucun cookie ni script tiers tant qu'il n'a pas cliqué.
 */
export function LocationMap() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-white/10 sm:aspect-[16/9]">
      {loaded ? (
        <iframe
          src={embedSrc}
          title={`Carte Google Maps : ${site.name}, ${formattedAddress}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="blueprint absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-lime/50 text-lime">
            <PinIcon className="h-7 w-7" />
          </span>
          <p className="font-display text-xl font-bold uppercase tracking-[0.04em]">{formattedAddress}</p>
          <button type="button" onClick={() => setLoaded(true)} className="btn btn-primary">
            Afficher la carte
          </button>
          <p className="max-w-sm text-sm text-muted">
            La carte est fournie par Google Maps, qui peut déposer des cookies une fois affichée.
          </p>
        </div>
      )}
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-[var(--radius)] bg-navy/90 px-3 py-2 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg hover:text-lime"
      >
        Ouvrir dans Google Maps
        <ArrowIcon className="h-4 w-4" />
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    </div>
  );
}
