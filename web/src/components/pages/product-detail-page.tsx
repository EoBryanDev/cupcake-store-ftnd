"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { MainContainer } from "../containers/main-container";
import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import { useProductVariantByIdQuery } from "@/src/hooks/queries/useProductVariantBySlug";
import { Section } from "../sections/section";
import { HighLightTitle } from "../sections/titles/highlight-title";
import { Subtitle } from "../sections/titles/subtitle";
import VariantSelector from "../products/variant-selector";
import { QuantitySelector } from "../products/quantity-selector";
import { ProductList } from "../products/product-list";
import { TableInverted } from "../table/table-inverted";
import { useState } from "react";
import AddToCartButton from "../buttons/add-cart-button";
import BuyNowButton from "../buttons/buy-now-button";
import { useProductVariantByCategoryQuery } from "@/src/hooks/queries/useProductVariantByCategory";

interface IProductDetailPageProps {
  slug: string;
  varSlug: string;
}
const ProductDetailPage = ({ slug, varSlug }: IProductDetailPageProps) => {
  const [quantity, setQuantity] = useState(1);
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProductVariantByIdQuery(slug);

  const {
    data: relatedProducts,
    isLoading: relatedProductsLoading,
    error: relatedProductsError,
  } = useProductVariantByCategoryQuery(slug);

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
  const productDetails = {
    id: product.data.variants[0].productVariantId,
    description: product.data.variants[0].description,
    unit: product.data.unit,
    color: product.data.variants[0].color,
    width: product.data.variants[0].width,
    height: product.data.variants[0].height,
    weight: product.data.variants[0].weight,
    size: product.data.variants[0].size,
    rawMaterial: product.data.variants[0].rawMaterial,
  };
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
            <HighLightTitle>{productVariant[0].name}</HighLightTitle>
            <div className="mt-3">
              <Subtitle>{product.data.category.name}</Subtitle>
            </div>
            <hr className="mt-3 mb-2" />
          </header>
          <section className="mb-8">
            <p className="text-shadow-amber-600">
              {productVariant[0].description}
            </p>
          </section>

          <section className="mb-8">
            <h4 className="mb-2 text-lg">Variants</h4>

            <VariantSelector
              selectedVariantSlug={varSlug}
              selectedProdSlug={slug}
              variants={productVariant}
            />
          </section>

          <main className="mb-8">
            <section className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">
                {formatCentsToBRL(productVariant[0].priceInCents)}
              </h2>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </section>
            <Subtitle>
              {formatCentsToBRL(productVariant[0].priceInCents * quantity)}
            </Subtitle>
          </main>
          <section className="flex flex-col justify-around space-y-3">
            <AddToCartButton
              product={{
                productVariantId: productVariant[0].productVariantId,
                name: productVariant[0].name,
                priceInCents: productVariant[0].priceInCents,
                imageUrl: productVariant[0].imageUrl || "",
                quantity: quantity,
              }}
            />
            <BuyNowButton
              product={{
                productVariantId: productVariant[0].productVariantId,
                name: productVariant[0].name,
                priceInCents: productVariant[0].priceInCents,
                imageUrl: productVariant[0].imageUrl || "",
                quantity: quantity,
              }}
            />
          </section>
        </section>
      </section>

      <hr className="my-8 mr-auto ml-auto w-1/2" />

      <section className="flex flex-col space-y-6 md:justify-around md:space-y-0 md:space-x-6">
        <header className="mr-auto mb-8">
          <HighLightTitle>Product Details</HighLightTitle>
          <Subtitle>See more about</Subtitle>
        </header>
        <main className="mr-auto w-full md:w-1/3">
          <TableInverted productInfo={productDetails} />
        </main>
      </section>

      <Section>
        <HighLightTitle>Related Products</HighLightTitle>
        <Subtitle>See related products too</Subtitle>
        {relatedProductsLoading && <div>Loading...</div>}
        {relatedProductsError && <div>Error loading products</div>}
        <div className="mt-8 py-4">
          {relatedProducts && <ProductList products={relatedProducts.data} />}
        </div>
      </Section>
    </MainContainer>
  );
};

export { ProductDetailPage };
