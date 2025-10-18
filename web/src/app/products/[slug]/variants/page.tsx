import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { ProductDetailPage } from "@/src/components/pages/product-detail";

interface IProductVariantsPageProps {
  params: Promise<{ slug: string }>;
}
const ProductVariantPage = async ({ params }: IProductVariantsPageProps) => {
  const { slug } = await params;

  return (
    <>
      <NavMenu />
      <ProductDetailPage slug={slug} />
      <MainFooter />
    </>
  );
};
export default ProductVariantPage;
