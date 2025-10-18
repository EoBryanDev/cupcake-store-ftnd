// page.tsx
import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { HomePage } from "@/src/components/pages/home-page";
import { getProductVariant } from "../services/product-variant.service";

export default async function Home() {
  let newestProdVarResp = null;
  let popularProdVarResp = null;

  // Só faz fetch se NÃO estiver em build time
  if (process.env.NODE_ENV !== "production" || typeof window !== "undefined") {
    const newestResp = await getProductVariant("newest");
    newestProdVarResp = newestResp || null;

    const popularResp = await getProductVariant(null);
    popularProdVarResp = popularResp || null;
  }

  return (
    <main className="flex min-h-screen max-w-screen flex-col">
      <NavMenu />
      <HomePage
        initialNwstVariantProd={newestProdVarResp}
        initialPopularVariantProd={popularProdVarResp}
      />
      <MainFooter />
    </main>
  );
}
