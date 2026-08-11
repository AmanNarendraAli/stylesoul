const SUPABASE_POOLER_SUFFIX = ".pooler.supabase.com";
const SUPABASE_TRANSACTION_POOLER_PORT = "6543";

export function normalizePrismaConnectionUrl(value: string | undefined) {
  if (!value) return undefined;

  const url = new URL(value);
  if (
    url.hostname.endsWith(SUPABASE_POOLER_SUFFIX) &&
    url.port === SUPABASE_TRANSACTION_POOLER_PORT &&
    !url.searchParams.has("pgbouncer")
  ) {
    url.searchParams.set("pgbouncer", "true");
  }

  return url.toString();
}
