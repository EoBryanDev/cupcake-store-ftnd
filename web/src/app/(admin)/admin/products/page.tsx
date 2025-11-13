import { CreateProductDialog } from "@/src/components/dialogs/create-product-dialog";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { ProductTable } from "@/src/components/tables/product-admin-table";

const AdmProducts = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex place-items-baseline justify-between p-2">
        <div>
          <HighLightTitle>Products</HighLightTitle>
          <Subtitle>Manage your products</Subtitle>
        </div>
        <div>
          <CreateProductDialog />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <ProductTable />
      </div>
    </div>
  );
};

export default AdmProducts;
