import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { HomePage } from "@/src/components/pages/home-page";
import { getProductVariant } from "../services/product-variant.service";

export default async function Home() {
  const newestProdVarResp = await getProductVariant("newest");
  const newestProdVarRespData = newestProdVarResp?.data || null;
  return (
    <>
      <NavMenu />
      <HomePage initialNwstVariantProd={newestProdVarRespData} />
      <MainFooter />
    </>
  );
}
