"use client";
import { useProductVariantQuery } from "@/src/hooks/queries/useProductVariants";
import { MainContainer } from "../containers/main-container";
import { CategoryNavigation } from "../menus/category-nav";
import { ProductGrid } from "../products/product-grid";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import { ProductGridPagination } from "../paginations/product-grid-pagination";
import { paginationDefault } from "@/src/helpers/pagination-default";

const ProductListPage = () => {
  const defaultPagination = paginationDefault();
  const {
    data: varProducts,
    isError: varProductsError,
    isLoading: varProductsLoading,
  } = useProductVariantQuery(defaultPagination);

  return (
    <MainContainer>
      <main className="flex">
        <aside className="w-1/3">
          <header className="mr-auto mb-8">
            <HighLightTitle>Filters</HighLightTitle>
          </header>
          <CategoryNavigation />
        </aside>
        <section className="w-2/3">
          <header className="mr-auto mb-8">
            <HighLightTitle>Products</HighLightTitle>
            <Subtitle>
              Explore our products and be plesured with our yummies
            </Subtitle>
          </header>
          {varProductsLoading && <div>Loading...</div>}
          {varProductsError && <div>Error loading products</div>}
          <div className="mt-8">
            {varProducts && <ProductGrid products={varProducts.data} />}
          </div>
          <footer className="mt-12">
            <ProductGridPagination />
          </footer>
        </section>
      </main>
    </MainContainer>
  );
};
export { ProductListPage };
