/**
 * Colour-space conversions and perceptual distance.
 *
 * Pure, dependency-free, browser-free — importable from React Native and the
 * Next.js server route alike. All maths operates on plain numbers/arrays so the
 * same code runs over canvas `ImageData` (client) and a posted pixel buffer
 * (server fallback).
 */

export type Rgb = { r: number; g: number; b: number };
export type Lab = { l: number; a: number; b: number };

/** Parse a `#rrggbb` (or `#rgb`) string into 0–255 RGB. */
export function hexToRgb(hex: string): Rgb {
  const cleaned = hex.replace(/^#/, "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const int = Number.parseInt(full, 16);
  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff,
  };
}

/** sRGB (0–255) → CIE XYZ (D65), via the standard sRGB EOTF. */
function rgbToXyz({ r, g, b }: Rgb): { x: number; y: number; z: number } {
  const lin = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const rl = lin(r);
  const gl = lin(g);
  const bl = lin(b);

  return {
    x: rl * 0.4124 + gl * 0.3576 + bl * 0.1805,
    y: rl * 0.2126 + gl * 0.7152 + bl * 0.0722,
    z: rl * 0.0193 + gl * 0.1192 + bl * 0.9505,
  };
}

// D65 reference white.
const WHITE = { x: 0.95047, y: 1.0, z: 1.08883 };

/** sRGB (0–255) → CIE L*a*b*. */
export function rgbToLab(rgb: Rgb): Lab {
  const { x, y, z } = rgbToXyz(rgb);
  const f = (t: number) =>
    t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;

  const fx = f(x / WHITE.x);
  const fy = f(y / WHITE.y);
  const fz = f(z / WHITE.z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

export function hexToLab(hex: string): Lab {
  return rgbToLab(hexToRgb(hex));
}

/**
 * CIEDE2000 colour difference (ΔE00). The perceptually-uniform standard; we use
 * it for preset matching because the presets are coarse and small hue/chroma
 * errors should not flip a match. Implementation follows Sharma et al. (2005).
 */
export function deltaE2000(a: Lab, b: Lab): number {
  const kL = 1;
  const kC = 1;
  const kH = 1;

  const c1 = Math.hypot(a.a, a.b);
  const c2 = Math.hypot(b.a, b.b);
  const cBar = (c1 + c2) / 2;

  const g =
    0.5 * (1 - Math.sqrt(cBar ** 7 / (cBar ** 7 + 25 ** 7)));

  const a1p = a.a * (1 + g);
  const a2p = b.a * (1 + g);

  const c1p = Math.hypot(a1p, a.b);
  const c2p = Math.hypot(a2p, b.b);

  const h1p = hueAngle(a.b, a1p);
  const h2p = hueAngle(b.b, a2p);

  const dLp = b.l - a.l;
  const dCp = c2p - c1p;

  let dhp = 0;
  if (c1p * c2p !== 0) {
    const diff = h2p - h1p;
    if (Math.abs(diff) <= 180) dhp = diff;
    else if (diff > 180) dhp = diff - 360;
    else dhp = diff + 360;
  }
  const dHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(toRad(dhp) / 2);

  const lBarp = (a.l + b.l) / 2;
  const cBarp = (c1p + c2p) / 2;

  let hBarp = h1p + h2p;
  if (c1p * c2p !== 0) {
    if (Math.abs(h1p - h2p) > 180) {
      hBarp += h1p + h2p < 360 ? 360 : -360;
    }
    hBarp /= 2;
  }

  const t =
    1 -
    0.17 * Math.cos(toRad(hBarp - 30)) +
    0.24 * Math.cos(toRad(2 * hBarp)) +
    0.32 * Math.cos(toRad(3 * hBarp + 6)) -
    0.2 * Math.cos(toRad(4 * hBarp - 63));

  const dTheta = 30 * Math.exp(-(((hBarp - 275) / 25) ** 2));
  const rc = 2 * Math.sqrt(cBarp ** 7 / (cBarp ** 7 + 25 ** 7));
  const sl =
    1 + (0.015 * (lBarp - 50) ** 2) / Math.sqrt(20 + (lBarp - 50) ** 2);
  const sc = 1 + 0.045 * cBarp;
  const sh = 1 + 0.015 * cBarp * t;
  const rt = -Math.sin(toRad(2 * dTheta)) * rc;

  return Math.sqrt(
    (dLp / (kL * sl)) ** 2 +
      (dCp / (kC * sc)) ** 2 +
      (dHp / (kH * sh)) ** 2 +
      rt * (dCp / (kC * sc)) * (dHp / (kH * sh)),
  );
}

function hueAngle(b: number, ap: number): number {
  if (ap === 0 && b === 0) return 0;
  const deg = (Math.atan2(b, ap) * 180) / Math.PI;
  return deg >= 0 ? deg : deg + 360;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
