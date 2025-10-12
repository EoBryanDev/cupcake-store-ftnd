"use client";
import { useProductVariantQuery } from "@/src/hooks/queries/useProductVariants";
import { MainContainer } from "../containers/main-container";
import { ProductList } from "../products/product-list";
import { Section } from "../sections/section";
import { Section85 } from "../sections/section85";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import { IProductData } from "@/src/interface/IProductVariant";
import { PromoBanner } from "../banners/promo-banner";

interface IHomePage {
  initialNwstVariantProd: IProductData | null;
}

function HomePage({ initialNwstVariantProd }: IHomePage) {
  const {
    data: newestProducts,
    isLoading,
    error,
  } = useProductVariantQuery("newest", {
    initialData: initialNwstVariantProd,
  });
  return (
    <>
      <MainContainer>
        <Section>
          <div className="text-center">
            <HighLightTitle>
              <span className="from-primary bg-gradient-to-r to-gray-500 bg-clip-text text-transparent">
                CupCake{" "}
              </span>
              Store
            </HighLightTitle>
            <Subtitle>
              A new concept of cupcake store. Mixing modern, art and yummy
              flavors.
            </Subtitle>
          </div>
        </Section>

        <hr />
        <Section85>
          <HighLightTitle>Newest Products</HighLightTitle>
          <Subtitle>Our newest products that will impress your tasty</Subtitle>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error loading products</div>}
          <div className="mt-8 py-4">
            {newestProducts && <ProductList products={newestProducts.data} />}
          </div>
        </Section85>
        <Section85>
          <PromoBanner src="https://pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev/promo-halloween.png"></PromoBanner>
        </Section85>
      </MainContainer>
    </>
  );
}

export { HomePage };
