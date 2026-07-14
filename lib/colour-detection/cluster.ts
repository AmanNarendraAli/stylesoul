import type { Lab } from "./colour.ts";

/**
 * k-means clustering in Lab space to recover a region's dominant colour while
 * rejecting shadows and specular highlights. We don't want the mean of the
 * sampled pixels — a few dark shadow pixels or a bright highlight would drag it
 * off the true tone. Clustering and taking the most-populous centroid isolates
 * the body of the colour.
 */

export type Cluster = { centroid: Lab; size: number };

const MAX_ITERATIONS = 20;

/**
 * Cluster `pixels` into at most `k` groups and return them sorted by population
 * (largest first). Deterministic: seeds are spread across the input by index so
 * the same pixels always produce the same result (important for testability).
 */
export function kmeansLab(pixels: Lab[], k = 3): Cluster[] {
  if (pixels.length === 0) return [];
  const effectiveK = Math.min(k, pixels.length);

  // Deterministic seeding: evenly spaced picks across the input.
  let centroids: Lab[] = Array.from({ length: effectiveK }, (_, i) => {
    const idx = Math.floor((i * pixels.length) / effectiveK);
    return { ...pixels[idx] };
  });

  let assignments = new Array<number>(pixels.length).fill(0);

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    let changed = false;

    for (let p = 0; p < pixels.length; p++) {
      let best = 0;
      let bestDist = Infinity;
      for (let c = 0; c < centroids.length; c++) {
        const d = squaredDist(pixels[p], centroids[c]);
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      }
      if (assignments[p] !== best) {
        assignments[p] = best;
        changed = true;
      }
    }

    const sums = centroids.map(() => ({ l: 0, a: 0, b: 0, n: 0 }));
    for (let p = 0; p < pixels.length; p++) {
      const s = sums[assignments[p]];
      s.l += pixels[p].l;
      s.a += pixels[p].a;
      s.b += pixels[p].b;
      s.n += 1;
    }

    centroids = centroids.map((prev, c) => {
      const s = sums[c];
      if (s.n === 0) return prev; // keep empty centroid as-is
      return { l: s.l / s.n, a: s.a / s.n, b: s.b / s.n };
    });

    if (!changed) break;
  }

  const counts = centroids.map(() => 0);
  for (const a of assignments) counts[a] += 1;

  return centroids
    .map((centroid, c) => ({ centroid, size: counts[c] }))
    .filter((cluster) => cluster.size > 0)
    .sort((x, y) => y.size - x.size);
}

/** The Lab colour of the most-populous cluster. */
export function dominantLab(pixels: Lab[], k = 3): Lab {
  const clusters = kmeansLab(pixels, k);
  if (clusters.length === 0) {
    throw new Error("dominantLab: no pixels to cluster");
  }
  return clusters[0].centroid;
}

function squaredDist(a: Lab, b: Lab): number {
  return (a.l - b.l) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2;
}
