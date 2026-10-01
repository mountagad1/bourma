"use client";

import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type EmblemSceneType from "./EmblemScene";
import type { PointerTarget } from "./EmblemScene";

type SceneComponent = typeof EmblemSceneType;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** En cas d'erreur WebGL/three.js, on n'affiche rien : la photo reste visible. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Emblème 3D du hero (toit BMS en relief, façon lettre découpée d'enseigne).
 * - Chargé après le premier rendu, pendant un temps mort du navigateur :
 *   three.js ne retarde ni le HTML ni l'image principale (LCP).
 * - Purement décoratif (aria-hidden) : sans WebGL, rien n'est perdu.
 * - Mouvement réduit : rendu statique. Écran tactile : pas de suivi du pointeur.
 */
export function HeroEmblem({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });
  const [Scene, setScene] = useState<SceneComponent | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [env, setEnv] = useState({ animate: true, lowPower: false });

  // Chargement différé du module 3D
  useEffect(() => {
    if (!supportsWebGL()) return;
    let cancelled = false;
    const load = () =>
      import("./EmblemScene")
        .then((mod) => !cancelled && setScene(() => mod.default))
        .catch(() => {});
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 2500 })
      : window.setTimeout(load, 1200);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  // Préférences : mouvement réduit, petit écran / tactile
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const sync = () => setEnv({ animate: !reduce.matches, lowPower: small.matches });
    sync();
    reduce.addEventListener("change", sync);
    small.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
    };
  }, []);

  // Suspend le rendu quand le hero n'est plus visible
  useEffect(() => {
    const el = host.current;
    if (!el || !Scene) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [Scene]);

  // Suivi du pointeur (souris uniquement), écrit dans une ref : aucun rendu React
  useEffect(() => {
    if (!Scene || !env.animate) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    const target = pointer.current;
    const onMove = (e: PointerEvent) => {
      target.x = MathClamp((e.clientX / window.innerWidth) * 2 - 1);
      target.y = MathClamp((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      target.x = 0;
      target.y = 0;
    };
  }, [Scene, env.animate]);

  const SceneView = Scene as ComponentType<Parameters<SceneComponent>[0]> | null;

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={`pointer-events-none transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {SceneView && (
        <SceneBoundary>
          <SceneView
            pointer={pointer}
            animate={env.animate}
            lowPower={env.lowPower}
            active={active}
            onReady={() => setReady(true)}
          />
        </SceneBoundary>
      )}
    </div>
  );
}

function MathClamp(v: number) {
  return Math.max(-1, Math.min(1, v));
}
