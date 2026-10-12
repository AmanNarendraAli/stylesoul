import { PrismaClient } from "@prisma/client";
import { normalizePrismaConnectionUrl } from "./connection-url";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: normalizePrismaConnectionUrl(process.env.DATABASE_URL),
    // Interactive transactions make many sequential round trips; Prisma's 5s
    // default is too tight when the app is far from the database (~300ms per
    // query from outside the database's region).
    transactionOptions: { maxWait: 10_000, timeout: 20_000 },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
