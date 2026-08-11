import "server-only";

import { prisma } from "@/lib/db/prisma";
import { markAccountDeleting } from "@/lib/server/account-lifecycle";

export type AccountAuthExport = {
  id: string;
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string | null;
  lastSignInAt: string | null;
  appMetadata: Record<string, unknown>;
  userMetadata: Record<string, unknown>;
};

export async function buildAccountExport(auth: AccountAuthExport) {
  const [account, analysisRateLimit] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id: auth.id },
      select: {
        id: true,
        email: true,
        stripeCustomerId: true,
        createdAt: true,
        subscription: {
          select: {
            id: true,
            stripeSubId: true,
            status: true,
            currentPeriodEnd: true,
          },
        },
        profile: true,
        weeklyEdits: {
          orderBy: { weekStart: "asc" },
          select: {
            id: true,
            weekStart: true,
            createdAt: true,
            items: {
              orderBy: { position: "asc" },
              select: {
                position: true,
                product: {
                  select: {
                    id: true,
                    brand: true,
                    title: true,
                    productUrl: true,
                  },
                },
              },
            },
          },
        },
        funnelEvents: {
          orderBy: { createdAt: "asc" },
          select: {
            name: true,
            createdAt: true,
          },
        },
        catalogueAuditLogs: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            productId: true,
            action: true,
            changes: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.analysisRateLimit.findUnique({
      where: { userId: auth.id },
      select: {
        windowStart: true,
        requestCount: true,
        updatedAt: true,
      },
    }),
  ]);

  return {
    format: "stylesoul-account-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    authentication: auth,
    account,
    analysisRateLimit,
  };
}

export async function deleteAccountDatabaseData(userId: string) {
  return prisma.$transaction(async (transaction) => {
    await markAccountDeleting(transaction, userId);
    const analysisRateLimit = await transaction.analysisRateLimit.deleteMany({
      where: { userId },
    });
    const account = await transaction.user.deleteMany({
      where: { id: userId },
    });

    return {
      deletedAccountRows: account.count,
      deletedRateLimitRows: analysisRateLimit.count,
    };
  });
}
