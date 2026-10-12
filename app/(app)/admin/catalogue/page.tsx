import { notFound, redirect } from "next/navigation";
import { CatalogueManager } from "@/components/admin/CatalogueManager";
import { signInPath } from "@/lib/auth-redirect";
import { getAdminActorState } from "@/lib/server/auth";
import {
  catalogueCoverage,
  listCatalogueProducts,
} from "@/lib/server/catalogue";

export default async function CatalogueAdminPage() {
  const auth = await getAdminActorState();
  if (!auth.ok) {
    if (auth.status === 401) redirect(signInPath("/admin/catalogue"));
    if (auth.status === 403) notFound();
    throw new Error(auth.message);
  }

  const [products, coverage] = await Promise.all([
    listCatalogueProducts(),
    catalogueCoverage(),
  ]);

  return (
    <CatalogueManager
      products={products.map((product) => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      }))}
      coverage={coverage}
    />
  );
}
