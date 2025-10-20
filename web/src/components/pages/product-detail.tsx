"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { MainContainer } from "../containers/main-container";
import { formatCentsToBRL } from "@/src/helpers/money";
import { useProductVariantByIdQuery } from "@/src/hooks/queries/useProductVariantBySlug";
import { Section } from "../sections/section";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";

interface IProductDetailPageProps {
  slug: string;
}
const ProductDetailPage = ({ slug }: IProductDetailPageProps) => {
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProductVariantByIdQuery(slug);

  if (productError) {
    return notFound();
  }

  if (productLoading) {
    // Você pode substituir isso por um componente de "esqueleto" (skeleton) para uma melhor UX
    return <MainContainer>Carregando...</MainContainer>;
  }

  if (!product) {
    return notFound();
  }

  const productVariant = product.data.variants;
  return (
    <MainContainer>
      <section className="flex flex-col space-y-6 md:flex-row md:justify-around md:space-y-0 md:space-x-6">
        <aside className="md:w-md">
          <Image
            src={productVariant[0].imageUrl || ""}
            alt={productVariant[0].name}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />
        </aside>

        <section className="md:w-md">
          {/* DESCRIÇÃO */}
          <header>
            <HighLightTitle>{product.data.name}</HighLightTitle>
            <Subtitle>{productVariant[0].name}</Subtitle>

            <hr className="mt-3 mb-2" />
          </header>
          <section className="mb-8">
            <p className="text-shadow-amber-600">
              {productVariant[0].description}
            </p>
          </section>

          <section className="mb-8">
            <h4 className="text-lg">Variants</h4>
            {/* >
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.variants}
          /> */}
          </section>

          <main className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-semibold">
              {formatCentsToBRL(productVariant[0].priceInCents)}
            </h2>

            <div className="flex items-center justify-between space-x-3">
              <button>+</button> 39 <button>-</button>
            </div>
          </main>
          <section className="flex flex-col justify-around space-y-3">
            <button className="bg-secondary w-full text-white">
              Adicionar ao carrinho
            </button>
            <button className="bg-primary w-full text-white">Comprar</button>
          </section>
        </section>

        {/* <ProductActions productVariantId={productVariant.id} /> */}

        {/* <ProductList products={likelyProducts} /> */}
      </section>

      <hr className="my-8 mr-auto ml-auto w-1/2" />

      <section className="flex flex-col space-y-6 md:flex-row md:justify-around md:space-y-0 md:space-x-6">
        <header className="mr-auto">
          <HighLightTitle>Product Details</HighLightTitle>
          <Subtitle>See more about</Subtitle>
        </header>
      </section>

      <section className="flex flex-col space-y-6 md:flex-row md:justify-around md:space-y-0 md:space-x-6">
        <header className="mr-auto">
          <HighLightTitle>Related Products</HighLightTitle>
          <Subtitle>See related products too</Subtitle>
        </header>
      </section>
    </MainContainer>
  );
};

export { ProductDetailPage };
