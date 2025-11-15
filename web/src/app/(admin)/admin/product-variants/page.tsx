import { CreateProductVariantDialog } from "@/src/components/dialogs/create-product-variant-dialog";
import { ConstructionPage } from "@/src/components/pages/construction";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { ProductVariantTable } from "@/src/components/tables/product-variant-admin-table";
import { Suspense } from "react";

const AdmProductVariants = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex place-items-baseline justify-between p-2">
        <HighLightTitle>Products Variants</HighLightTitle>
        <Subtitle>Manage your product variants</Subtitle>
        <div className="pr-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                Loading...
              </div>
            }
          >
            <CreateProductVariantDialog />
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
          <ProductVariantTable />
        </Suspense>
      </div>
    </div>
  );
};

export default AdmProductVariants;
