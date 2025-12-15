"use client";
import { MainContainer } from "../containers/main-container";
import { ProductList } from "../products/product-list";
import { Section } from "../sections/section";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import { PromoBanner } from "../banners/promo-banner";
import { useProductVariantPopularQuery } from "@/src/hooks/queries/useProductVariantsPopular";
import { useProductVariantNewestQuery } from "@/src/hooks/queries/useProductVariantsNewest";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation(["home", "common"]);
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
                {t("hero.title")}{" "}
              </span>
            </HighLightTitle>
            <Subtitle>{t("hero.subtitle")}</Subtitle>
          </div>
          <div className="">
            <PromoBanner src="https://pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev/cupcake-store.png" />
          </div>
        </Section>

        <hr />

        <Section>
          <HighLightTitle>{t("sections.newest.title")}</HighLightTitle>
          <Subtitle>{t("sections.newest.subtitle")}</Subtitle>
          {newestProductsLoading && <div>{t("common:status.loading")}</div>}
          {newestProductsError && <div>{t("common:status.error")}</div>}
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
          <HighLightTitle>{t("sections.popular.title")}</HighLightTitle>
          <Subtitle>{t("sections.popular.subtitle")}</Subtitle>
          {popularProductsLoading && <div>{t("common:status.loading")}</div>}
          {popularProductsError && <div>{t("common:status.error")}</div>}
          <div className="mt-8 py-4">
            {popularProducts && <ProductList products={popularProducts.data} />}
          </div>
        </Section>
      </MainContainer>
    </main>
  );
}

export { HomePage };
