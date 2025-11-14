import { CreateProductDialog } from "@/src/components/dialogs/create-product-dialog";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { ProductTable } from "@/src/components/tables/product-admin-table";
import { Suspense } from "react";

const AdmProducts = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex place-items-baseline justify-between p-2">
        <div>
          <HighLightTitle>Products</HighLightTitle>
          <Subtitle>Manage your products</Subtitle>
        </div>
        <div className="pr-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                Loading...
              </div>
            }
          >
            <CreateProductDialog />
          </Suspense>
        </div>
      </div>

      <div className="mt-4 flex-1 px-2 pr-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              Loading product data...
            </div>
          }
        >
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
};

export default AdmProducts;
