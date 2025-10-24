"use client";
import { MainContainer } from "../containers/main-container";
import { ProductList } from "../products/product-list";
import { Section } from "../sections/section";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import { PromoBanner } from "../banners/promo-banner";
import { useProductVariantPopularQuery } from "@/src/hooks/queries/useProductVariantsPopular";
import { useProductVariantNewestQuery } from "@/src/hooks/queries/useProductVariantsNewest";

function HomePage() {
  const {
    data: newestProducts,
    isLoading: newestProductsLoading,
    error: newestProductsError,
  } = useProductVariantNewestQuery();

  const {
    data: popularProducts,
    isLoading: popularProductsLoading,
    error: popularProductsError,
  } = useProductVariantPopularQuery();
  return (
    <main>
      <MainContainer>
        <Section>
          <div className="mb-8 text-center">
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
          <div className="">
            <PromoBanner src="https://pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev/cupcake-store.png" />
          </div>
        </Section>

        <hr />

        <Section>
          <HighLightTitle>Newest Products</HighLightTitle>
          <Subtitle>Our newest products that will impress your tasty</Subtitle>
          {newestProductsLoading && <div>Loading...</div>}
          {newestProductsError && <div>Error loading products</div>}
          <div className="mt-8">
            {newestProducts && <ProductList products={newestProducts.data} />}
          </div>
        </Section>

        <hr />

        <Section>
          <div className="">
            <PromoBanner src="https://pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev/promo-halloween.png" />
          </div>
        </Section>

        <hr />

        <Section>
          <HighLightTitle>Most Popular</HighLightTitle>
          <Subtitle>
            Our most popular products that impressour customers
          </Subtitle>
          {popularProductsLoading && <div>Loading...</div>}
          {popularProductsError && <div>Error loading products</div>}
          <div className="mt-8 py-4">
            {popularProducts && <ProductList products={popularProducts.data} />}
          </div>
        </Section>
      </MainContainer>
    </main>
  );
}

export { HomePage };
