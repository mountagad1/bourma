import type { ServiceVisual } from "@/content/services";

type Motif = Extract<ServiceVisual, { kind: "illustration" }>["motif"];

/**
 * Illustrations « plan technique » utilisées tant que les photos réelles
 * des réalisations ne sont pas disponibles. Elles sont volontairement
 * stylisées pour ne pas être confondues avec des projets réels.
 */
export function ServiceIllustration({ motif, className }: { motif: Motif; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g stroke="#F5F5F5" strokeOpacity="0.85" strokeWidth="2">
        {motifs[motif]}
      </g>
    </svg>
  );
}

const lime = "#75D52F";
const dim = { stroke: "#A7AFBC", strokeOpacity: 0.7, strokeWidth: 1 } as const;

const motifs: Record<Motif, React.ReactNode> = {
  agencement: (
    <>
      <path d="M40 250h320" />
      {/* Étagères murales */}
      <path d="M60 90h90v160M60 90v160" />
      <path d="M60 130h90M60 170h90M60 210h90" />
      <path d="M72 128v-22h16v22M96 128v-16h14v16M74 168v-18h20v18M112 168v-26h18v26M70 208v-14h30v14" stroke={lime} />
      {/* Comptoir */}
      <path d="M200 250v-70h140v70M190 180h160" />
      <path d="M200 205h140" strokeOpacity="0.4" />
      {/* Suspension */}
      <path d="M270 40v70" />
      <path d="M250 125l20-15 20 15z" stroke={lime} />
      {/* Cotes */}
      <path d="M200 268h140M200 262v12M340 262v12" {...dim} />
      <path d="M44 90v160M38 90h12M38 250h12" {...dim} />
    </>
  ),
  store: (
    <>
      <path d="M40 270h320M60 270V40h280v230" />
      {/* Vitrine */}
      <path d="M90 270V170h220v100M200 170v100" />
      {/* Store banne déployé */}
      <path d="M70 110h260" />
      <path d="M70 110l-20 60h300l-20-60" stroke={lime} />
      <path d="M50 170v14h300v-14" stroke={lime} />
      <path d="M110 110l-13 60M150 110l-6 60M190 110v60M230 110l6 60M270 110l13 60M310 110l20 60" stroke={lime} strokeOpacity="0.55" strokeWidth="1.5" />
      {/* Bras */}
      <path d="M80 112l-20 50M320 112l20 50" strokeOpacity="0.5" />
      <path d="M30 110v74M24 110h12M24 184h12" {...dim} />
    </>
  ),
  porte: (
    <>
      <path d="M30 270h340M70 270V60h260v210" />
      <path d="M90 270V80h220v190" />
      {/* Panneaux horizontaux */}
      <path d="M90 118h220M90 156h220M90 194h220M90 232h220" stroke={lime} />
      <path d="M105 99h190M105 137h190M105 175h190M105 213h190M105 251h190" strokeOpacity="0.25" />
      {/* Rails remontant sous plafond */}
      <path d="M90 80q0-20 20-20h160M310 80q0-20-20-20" strokeOpacity="0.5" />
      <rect x="185" y="246" width="30" height="6" stroke={lime} />
      <path d="M90 284h220M90 278v12M310 278v12" {...dim} />
      <path d="M346 80v190M340 80h12M340 270h12" {...dim} />
    </>
  ),
  maintenance: (
    <>
      {/* Clé plate */}
      <path d="M95 235l120-120" strokeWidth="14" stroke="#F5F5F5" strokeOpacity="0.85" />
      <path d="M210 92a28 28 0 1 0 28 28l-14-2-12-12z" />
      {/* Tournevis */}
      <path d="M300 230L190 120" stroke={lime} strokeWidth="5" />
      <path d="M318 248l-28-28 12-12 28 28z" stroke={lime} />
      {/* Écrou */}
      <path d="M300 70l20 11.5v23L300 116l-20-11.5v-23z" />
      <circle cx="300" cy="93" r="9" stroke={lime} />
      {/* Cotes */}
      <path d="M60 60h120M60 54v12M180 54v12" {...dim} />
      <circle cx="95" cy="235" r="3" fill={lime} stroke="none" />
    </>
  ),
};
