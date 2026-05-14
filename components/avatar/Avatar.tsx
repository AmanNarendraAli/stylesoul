"use client";

import { motion } from "framer-motion";
import type { BodyShape } from "@/lib/body-shape/classify";
import type { ColourSeason } from "@/lib/colour-season/map";
import { SEASON_PALETTES, SHAPE_PROPORTIONS } from "./palettes";

export type AvatarProps = {
  shape: BodyShape;
  season: ColourSeason;
  size?: number;
  pulse?: boolean;
};

const CENTRE_X = 100;
const SHOULDER_Y = 82;
const BUST_Y = 118;
const WAIST_Y = 168;
const HIPS_Y = 214;
const HEM_Y = 286;

export function Avatar({ shape, season, size = 220, pulse = true }: AvatarProps) {
  const proportions = SHAPE_PROPORTIONS[shape];
  const palette = SEASON_PALETTES[season];

  const half = (width: number) => width / 2;

  const topPath = [
    `M ${CENTRE_X - half(proportions.shoulders)} ${SHOULDER_Y}`,
    `L ${CENTRE_X + half(proportions.shoulders)} ${SHOULDER_Y}`,
    `L ${CENTRE_X + half(proportions.bust)} ${BUST_Y}`,
    `L ${CENTRE_X + half(proportions.waist)} ${WAIST_Y}`,
    `L ${CENTRE_X - half(proportions.waist)} ${WAIST_Y}`,
    `L ${CENTRE_X - half(proportions.bust)} ${BUST_Y}`,
    "Z",
  ].join(" ");

  const bottomPath = [
    `M ${CENTRE_X - half(proportions.waist)} ${WAIST_Y}`,
    `L ${CENTRE_X + half(proportions.waist)} ${WAIST_Y}`,
    `L ${CENTRE_X + half(proportions.hips)} ${HIPS_Y}`,
    `L ${CENTRE_X + half(proportions.hem)} ${HEM_Y}`,
    `L ${CENTRE_X - half(proportions.hem)} ${HEM_Y}`,
    `L ${CENTRE_X - half(proportions.hips)} ${HIPS_Y}`,
    "Z",
  ].join(" ");

  return (
    <svg
      viewBox="0 0 200 320"
      width={size}
      height={size * (320 / 200)}
      role="img"
      aria-label={`Stylised silhouette: ${shape}, ${season}`}
      className="block"
    >
      <defs>
        <radialGradient id={`pulse-${shape}-${season}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.pulse} stopOpacity="0.45" />
          <stop offset="100%" stopColor={palette.pulse} stopOpacity="0" />
        </radialGradient>
      </defs>

      {pulse ? (
        <motion.circle
          cx={CENTRE_X}
          cy={170}
          r={120}
          fill={`url(#pulse-${shape}-${season})`}
          initial={{ opacity: 0.4, scale: 0.92 }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.92, 1.04, 0.92] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <circle cx={CENTRE_X} cy={46} r={20} fill={palette.skin} />
      <rect x={CENTRE_X - 7} y={62} width={14} height={22} fill={palette.skin} rx={3} />

      <path d={topPath} fill={palette.top} />
      <rect
        x={CENTRE_X - half(proportions.waist)}
        y={WAIST_Y - 4}
        width={proportions.waist}
        height={8}
        fill={palette.accent}
      />
      <path d={bottomPath} fill={palette.bottom} />
    </svg>
  );
}
