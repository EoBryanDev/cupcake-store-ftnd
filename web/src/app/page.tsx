// page.tsx
import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { HomePage } from "@/src/components/pages/home-page";
import { getProductVariant } from "../services/product-variant.service";

export default async function Home() {
  let newestProdVarRespData = null;
  let popularProdVarRespData = null;

  // Só faz fetch se NÃO estiver em build time
  if (process.env.NODE_ENV !== "production" || typeof window !== "undefined") {
    const newestProdVarResp = await getProductVariant("newest");
    newestProdVarRespData = newestProdVarResp?.data || null;

    const popularProdVarResp = await getProductVariant(null);
    popularProdVarRespData = popularProdVarResp?.data || null;
  }

  return (
    <div className="flex min-h-screen max-w-screen flex-col">
      <NavMenu />
      <HomePage
        initialNwstVariantProd={newestProdVarRespData}
        initialPopularVariantProd={popularProdVarRespData}
      />
      <MainFooter />
    </div>
  );
}
