import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { assertAccountWritable } from "@/lib/server/account-lifecycle";
import {
  mondayUtc,
  selectWeeklyProducts,
} from "@/lib/recommendations/select";

const weeklyEditInclude = {
  items: {
    orderBy: { position: "asc" as const },
    include: { product: true },
  },
} satisfies Prisma.WeeklyEditInclude;

export class MissingStyleProfileError extends Error {}
export class InsufficientCatalogueError extends Error {}

export function findWeeklyEditForUser(userId: string, weekStart: Date) {
  return prisma.weeklyEdit.findUnique({
    where: { userId_weekStart: { userId, weekStart } },
    include: weeklyEditInclude,
  });
}

export async function getOrCreateWeeklyEditForUser(
  userId: string,
  now = new Date(),
) {
  const weekStart = mondayUtc(now);
  const cached = await findWeeklyEditForUser(userId, weekStart);
  if (cached) return cached;

  const [profile, products, history] = await Promise.all([
    prisma.styleProfile.findUnique({
      where: { userId },
      select: {
        bodyShape: true,
        colourSeason: true,
        faceLength: true,
        faceLines: true,
        temperature: true,
      },
    }),
    prisma.product.findMany({ where: { status: "active" } }),
    prisma.weeklyEditItem.findMany({
      where: {
        weeklyEdit: {
          userId,
          weekStart: {
            gte: addUtcDays(weekStart, -56),
            lt: weekStart,
          },
        },
      },
      select: { productId: true },
    }),
  ]);

  if (!profile) throw new MissingStyleProfileError();

  const selected = selectWeeklyProducts({
    products,
    profile,
    excludedProductIds: new Set(history.map((item) => item.productId)),
    userId,
    weekStart,
  });
  if (selected.length < 3) {
    throw new InsufficientCatalogueError(
      "At least three active catalogue products are required",
    );
  }

  try {
    return await prisma.$transaction(async (transaction) => {
      await assertAccountWritable(transaction, userId);
      const winner = await transaction.weeklyEdit.findUnique({
        where: { userId_weekStart: { userId, weekStart } },
        include: weeklyEditInclude,
      });
      if (winner) return winner;

      return transaction.weeklyEdit.create({
        data: {
          userId,
          weekStart,
          items: {
            create: selected.map((product, position) => ({
              productId: product.id,
              position,
            })),
          },
        },
        include: weeklyEditInclude,
      });
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const winner = await findWeeklyEditForUser(userId, weekStart);
      if (winner) return winner;
    }
    throw error;
  }
}

function addUtcDays(date: Date, days: number) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}
