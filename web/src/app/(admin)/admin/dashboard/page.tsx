import { ConstructionPage } from "@/src/components/pages/construction";
import { Section } from "@/src/components/sections/section";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";

const AdminDashboard = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Top section */}
      <div>
        <Section>
          <HighLightTitle>Dashboard</HighLightTitle>
          <Subtitle>See what is going on with your store</Subtitle>
        </Section>
      </div>

      {/* Content centralizado no espaço restante */}
      <div className="flex flex-1 items-center justify-center">
        <ConstructionPage />
      </div>
    </div>
  );
};

export default AdminDashboard;
