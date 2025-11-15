import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { ProductListPage } from "@/src/components/pages/product-list-page";
import { Suspense } from "react";

const SearchPage = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMenu />
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              Loading products...
            </div>
          }
        >
          <ProductListPage />
        </Suspense>
      </div>
      <MainFooter />
    </div>
  );
};
export default SearchPage;
