import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { ProductListPage } from "@/src/components/pages/product-list-page";

const SearchPage = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMenu />
      <div className="flex-1">
        <ProductListPage />
      </div>
      <MainFooter />
    </div>
  );
};
export default SearchPage;
