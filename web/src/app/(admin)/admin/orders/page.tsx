import { ConstructionPage } from "@/src/components/pages/construction";
import { Section } from "@/src/components/sections/section";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";
import { OrderTable } from "@/src/components/tables/order-admin-table";

const OrderManagement = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <HighLightTitle>Orders</HighLightTitle>
        <Subtitle>Manage your client's orders</Subtitle>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderManagement;
