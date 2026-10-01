"use client";

import { useEffect } from "react";

/**
 * Calcule la profondeur de chaque carte de la pile pendant le défilement.
 *
 * Pour chaque carte i > 0, on mesure sa progression d'arrivée vers sa
 * position collante (0 = encore loin, 1 = épinglée). La profondeur d'une
 * carte est la somme des progressions des cartes qui la suivent.
 * Le résultat est écrit dans la variable CSS --depth : aucun état React,
 * une seule passe de lecture puis une passe d'écriture par frame, et le
 * calcul ne tourne que lorsque la pile est visible.
 */
export function DeckMotion({ deckId }: { deckId: string }) {
  useEffect(() => {
    const deck = document.getElementById(deckId);
    if (!deck) return;
    const items = Array.from(deck.querySelectorAll<HTMLElement>("[data-deck-item]"));
    if (items.length < 2) return;

    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-height: 540px)");
    let stickyTops: number[] = [];
    let distance = 1;
    let frame = 0;
    let visible = false;

    const measure = () => {
      stickyTops = items.map((el) => parseFloat(getComputedStyle(el).top) || 0);
      // Distance parcourue par une carte entre son entrée et son épinglage
      const gap = parseFloat(getComputedStyle(deck).rowGap) || 0;
      distance = Math.max(1, items[0].offsetHeight + gap);
    };

    const update = () => {
      frame = 0;
      // Lecture
      const progress = items.map((el, i) => {
        if (i === 0) return 0;
        const delta = el.getBoundingClientRect().top - stickyTops[i];
        return Math.min(1, Math.max(0, 1 - delta / distance));
      });
      // Écriture
      let depth = 0;
      for (let i = items.length - 1; i >= 0; i--) {
        items[i].style.setProperty("--depth", depth.toFixed(3));
        depth += progress[i];
      }
    };

    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(update);
    };

    const reset = () => items.forEach((el) => el.style.removeProperty("--depth"));

    const onResize = () => {
      measure();
      schedule();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      },
      { rootMargin: "20% 0px" },
    );

    const start = () => {
      measure();
      observer.observe(deck);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize);
    };
    const stop = () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
      frame = 0;
      reset();
    };

    const onPreferenceChange = () => (motionOk.matches ? start() : stop());
    if (motionOk.matches) start();
    motionOk.addEventListener("change", onPreferenceChange);

    return () => {
      motionOk.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, [deckId]);

  return null;
}
