import { ConstructionPage } from "@/src/components/pages/construction";
import { Section } from "@/src/components/sections/section";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { OrderTable } from "@/src/components/tables/order-admin-table";
import { Suspense } from "react";

const OrderManagement = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <HighLightTitle>Orders</HighLightTitle>
        <Subtitle>Manage your client's orders</Subtitle>
      </div>

      <div className="mt-4 flex-1 px-2 pr-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              Loading orders...
            </div>
          }
        >
          <OrderTable />
        </Suspense>
      </div>
    </div>
  );
};

export default OrderManagement;
