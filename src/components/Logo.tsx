type LogoProps = {
  /** Affiche la signature « BOURA MULTISERVICES » sous le monogramme. */
  withSignature?: boolean;
  className?: string;
  /** Logo décoratif (le texte est déjà présent à côté). */
  decorative?: boolean;
};

/**
 * Logo BMS redessiné en SVG d'après la façade : toit vert, monogramme
 * blanc et signature avec M et S en vert.
 */
export function Logo({ withSignature = false, className, decorative = false }: LogoProps) {
  const height = withSignature ? 152 : 120;
  return (
    <svg
      viewBox={`0 0 260 ${height}`}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "BMS – Boura Multiservices"}
      focusable="false"
    >
      <path
        d="M8 118V50L60 8l52 42"
        fill="none"
        stroke="var(--lime)"
        strokeWidth="9"
        strokeLinejoin="miter"
      />
      <path d="M60 31l17 15H43z" fill="var(--lime)" />
      <text
        x="24"
        y="116"
        textLength="228"
        lengthAdjust="spacingAndGlyphs"
        fill="var(--white)"
        style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 80 }}
      >
        BMS
      </text>
      {withSignature && (
        <>
          <text
            x="8"
            y="139"
            textLength="244"
            lengthAdjust="spacingAndGlyphs"
            fill="var(--white)"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18 }}
          >
            BOURA <tspan fill="var(--lime)">M</tspan>ULTI<tspan fill="var(--lime)">S</tspan>ERVICES
          </text>
          <rect x="8" y="146" width="244" height="3.5" fill="var(--lime)" />
        </>
      )}
    </svg>
  );
}
