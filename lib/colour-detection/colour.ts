/**
 * Colour-space conversions. Pure and dependency-free, so the same code runs
 * over canvas `ImageData` and decoded image buffers.
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
