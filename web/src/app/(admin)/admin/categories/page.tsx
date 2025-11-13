import { CreateCategoryDialog } from "@/src/components/dialogs/create-category-dialog";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { CategoryTable } from "@/src/components/tables/category-admin-table";

const Categories = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex place-items-baseline justify-between p-2">
        <div>
          <HighLightTitle>Categories</HighLightTitle>
          <Subtitle>Manage your product categories</Subtitle>
        </div>

        <div>
          <CreateCategoryDialog />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <CategoryTable />
      </div>
    </div>
  );
};

export default Categories;
