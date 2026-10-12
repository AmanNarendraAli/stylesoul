import "server-only";

import { prisma } from "@/lib/db/prisma";
import { assertAccountWritable } from "@/lib/server/account-lifecycle";
import { mondayUtc } from "@/lib/recommendations/select";
import {
  deriveStyleProfile,
  type StyleProfileInput,
} from "@/lib/style-profile/schema";

export function findStyleProfile(userId: string) {
  return prisma.styleProfile.findUnique({ where: { userId } });
}

export async function hasStyleProfile(userId: string) {
  const profile = await prisma.styleProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  return profile !== null;
}

export async function saveStyleProfile({
  userId,
  email,
  input,
}: {
  userId: string;
  email: string;
  input: StyleProfileInput;
}) {
  const profileData = deriveStyleProfile(input);
  // A re-run that skips measurements keeps any measurements and silhouette
  // saved earlier; only newly submitted measurements replace them.
  // When measurements are submitted, an omitted weight clears the old one.
  const { bodyShape, ...colourOnlyData } = profileData;
  const updateData =
    bodyShape === null
      ? colourOnlyData
      : { ...profileData, weightKg: profileData.weightKg ?? null };

  return prisma.$transaction(async (transaction) => {
    await assertAccountWritable(transaction, userId);
    await transaction.user.upsert({
      where: { id: userId },
      create: { id: userId, email },
      update: { email },
    });

    const profile = await transaction.styleProfile.upsert({
      where: { userId },
      create: { userId, ...profileData },
      update: updateData,
    });
    await transaction.weeklyEdit.deleteMany({
      where: { userId, weekStart: { gte: mondayUtc(new Date()) } },
    });
    return profile;
  });
}
