import { ExtrudeGeometry, Shape, Vector2 } from "three";

/**
 * Géométrie du toit BMS, reprise du tracé SVG du logo (src/components/Logo.tsx) :
 * mur gauche + pignon (trait « M8 118 V50 L60 8 L112 50 », épaisseur 9)
 * et petit triangle plein sous le faîtage.
 * Le contour du trait est calculé avec des jonctions en onglet, puis extrudé
 * comme une lettre découpée d'enseigne.
 */

// Coordonnées SVG (y vers le bas)
const PATH: [number, number][] = [
  [8, 118],
  [8, 50],
  [60, 8],
  [112, 50],
];
const TRIANGLE: [number, number][] = [
  [60, 31],
  [77, 46],
  [43, 46],
];
const STROKE = 9;

// Centre approximatif du motif, pour centrer l'objet sur l'origine
const CENTER = { x: 60, y: 63 };
const SCALE = 1 / 60;

const toVec = ([x, y]: [number, number]) => new Vector2((x - CENTER.x) * SCALE, (CENTER.y - y) * SCALE);

/** Contour fermé d'une polyligne épaisse (extrémités franches, angles en onglet). */
function strokeOutline(points: Vector2[], width: number): Vector2[] {
  const half = width / 2;
  const left: Vector2[] = [];
  const right: Vector2[] = [];
  const normalOf = (a: Vector2, b: Vector2) => {
    const d = b.clone().sub(a).normalize();
    return new Vector2(-d.y, d.x);
  };

  points.forEach((p, i) => {
    let offset: Vector2;
    if (i === 0) offset = normalOf(p, points[1]).multiplyScalar(half);
    else if (i === points.length - 1) offset = normalOf(points[i - 1], p).multiplyScalar(half);
    else {
      const n1 = normalOf(points[i - 1], p);
      const n2 = normalOf(p, points[i + 1]);
      const miter = n1.clone().add(n2).normalize();
      offset = miter.multiplyScalar(half / miter.dot(n1));
    }
    left.push(p.clone().add(offset));
    right.push(p.clone().sub(offset));
  });

  return [...left, ...right.reverse()];
}

export function createEmblemGeometry(detail: "high" | "low" = "high") {
  const outline = strokeOutline(PATH.map(toVec), STROKE * SCALE);
  const roof = new Shape(outline);
  const triangle = new Shape(TRIANGLE.map(toVec));

  const geometry = new ExtrudeGeometry([roof, triangle], {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.018,
    bevelSegments: detail === "high" ? 4 : 1,
    curveSegments: 1,
  });
  geometry.center();
  return geometry;
}
