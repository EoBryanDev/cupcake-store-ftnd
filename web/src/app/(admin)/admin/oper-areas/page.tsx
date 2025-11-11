import { ConstructionPage } from "@/src/components/pages/construction";
import { Section } from "@/src/components/sections/section";
import { HighLightTitle } from "@/src/components/sections/titles/highlight-title";
import { Subtitle } from "@/src/components/sections/titles/subtitle";

const OperAreas = () => {
  return (
    <div className="flex h-full flex-col">
      <div>
        <Section>
          <HighLightTitle>Operational Areas</HighLightTitle>
          <Subtitle>Add new operational areas and shipping companies</Subtitle>
        </Section>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <ConstructionPage />
      </div>
    </div>
  );
};

export default OperAreas;
