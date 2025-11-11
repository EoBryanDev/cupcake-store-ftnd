import { ConstructionPage } from "@/src/components/pages/construction";
import { Section } from "@/src/components/sections/section";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";

const OrderManagement = () => {
  return (
    <div className="flex h-full flex-col">
      <div>
        <Section>
          <HighLightTitle>Orders</HighLightTitle>
          <Subtitle>Manage your client's orders</Subtitle>
        </Section>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <ConstructionPage />
      </div>
    </div>
  );
};

export default OrderManagement;
