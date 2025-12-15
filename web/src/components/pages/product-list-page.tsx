"use client";
import { useProductVariantQuery } from "@/src/hooks/queries/useProductVariants";
import { MainContainer } from "../containers/main-container";
import { CategoryNavigation, IFilters } from "../menus/category-nav";
import { ProductGrid } from "../products/product-grid";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import { ProductGridPagination } from "../paginations/product-grid-pagination";
import { useEffect, useState } from "react";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { useSearchParams } from "next/navigation";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";

const ProductListPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const [pagination, setPagination] =
    useState<IPaginationDefault>(paginationDefault());
  const [filters, setFilters] = useState<IFilters>({
    colors: [],
    sizes: [],
    price: [0, 100],
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const currentPage = parseInt(page);
    const limit = pagination.limit;
    const offset = (currentPage - 1) * limit + 1;
    setPagination((prev) => ({ ...prev, currentPage, offset }));
  }, [page, pagination.limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters]);

  const {
    data: varProducts,
    isError: varProductsError,
    isLoading: varProductsLoading,
  } = useProductVariantQuery(pagination, debouncedFilters);

  return (
    <MainContainer>
      <main className="flex min-h-[calc(100vh-200px)] flex-col md:flex-row">
        <aside className="hidden md:block md:w-1/3">
          <header className="mr-auto mb-8">
            <HighLightTitle>Filters</HighLightTitle>
          </header>
          <CategoryNavigation filters={filters} setFilters={setFilters} />
        </aside>
        <section className="flex w-full flex-col md:w-2/3">
          <header className="mb-8 md:mr-auto">
            <HighLightTitle>Products</HighLightTitle>
            <Subtitle>
              Explore our products and be pleased with our yummies
            </Subtitle>
          </header>

          {varProductsLoading && (
            <div className="flex flex-1 items-center justify-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          )}

          {varProductsError && (
            <div className="flex flex-1 items-center justify-center py-12">
              <p className="text-destructive">Error loading products</p>
            </div>
          )}

          {varProducts && (
            <>
              <div className="flex-1">
                <ProductGrid products={varProducts.data} />
              </div>
              <footer className="mt-12">
                {varProducts.pagination && (
                  <ProductGridPagination
                    totalPages={varProducts.pagination.totalPages}
                    currentPage={pagination.currentPage}
                  />
                )}
              </footer>
            </>
          )}
        </section>
      </main>
    </MainContainer>
  );
};
export { ProductListPage };
