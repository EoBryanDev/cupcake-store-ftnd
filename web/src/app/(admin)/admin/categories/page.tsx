import { CreateCategoryDialog } from "@/src/components/dialogs/create-category-dialog";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { CategoryTable } from "@/src/components/tables/category-admin-table";
import { Suspense } from "react";

const Categories = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex place-items-baseline justify-between p-2">
        <div>
          <HighLightTitle>Categories</HighLightTitle>
          <Subtitle>Manage your product categories</Subtitle>
        </div>

        <div className="pr-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                Loading...
              </div>
            }
          >
            <CreateCategoryDialog />
          </Suspense>
        </div>
      </div>

      <div className="mt-4 flex-1 px-2 pr-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              Loading category data...
            </div>
          }
        >
          <CategoryTable />
        </Suspense>
      </div>
    </div>
  );
};

export default Categories;
