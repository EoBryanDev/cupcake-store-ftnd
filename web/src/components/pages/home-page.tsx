import { MainContainer } from "../containers/main-container";
import { ProductList } from "../products/product-list";
import { Section } from "../sections/section";
import { Section85 } from "../sections/section85";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";

function HomePage() {
  return (
    <>
      <MainContainer>
        <Section>
          <div className="text-center">
            <HighLightTitle>
              <span className="from-primary bg-gradient-to-r to-gray-500 bg-clip-text text-transparent">
                CupCake{" "}
              </span>
              Store
            </HighLightTitle>
            <Subtitle>
              A new concept of cupcake store. Mixing modern, art and yummy
              flavors.
            </Subtitle>
          </div>
        </Section>

        <hr />
        <Section85>
          <HighLightTitle>Newest Products</HighLightTitle>
          <Subtitle>Our newest products that will impress your tasty</Subtitle>
          <ProductList products={} />
        </Section85>
      </MainContainer>
    </>
  );
}

export { HomePage };
