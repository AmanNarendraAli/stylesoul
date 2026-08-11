import "server-only";

import { reportServerError } from "@/lib/observability/redact";
import { prisma } from "@/lib/db/prisma";
import {
  AccountDeletedError,
  assertAccountWritable,
} from "@/lib/server/account-lifecycle";

export const funnelEventNames = [
  "signup_complete",
  "analysis_complete",
  "first_edit_view",
] as const;

export type FunnelEventName = (typeof funnelEventNames)[number];

export async function recordFunnelEvent({
  userId,
  name,
  email,
  occurredAt,
}: {
  userId: string;
  name: FunnelEventName;
  email?: string;
  occurredAt?: Date;
}) {
  try {
    return await prisma.$transaction(async (transaction) => {
      await assertAccountWritable(transaction, userId);
      if (email) {
        await transaction.user.upsert({
          where: { id: userId },
          create: { id: userId, email },
          update: { email },
        });
      }

      return transaction.funnelEvent.createMany({
        data: [{ userId, name, createdAt: occurredAt }],
        skipDuplicates: true,
      });
    });
  } catch (error) {
    if (error instanceof AccountDeletedError) return null;
    reportServerError("funnel_event_record_failed", error, { userId, name });
    return null;
  }
}
