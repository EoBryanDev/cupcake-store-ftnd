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
import { useState, useMemo } from "react";
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

  // Encontra a variante selecionada baseada no varSlug
  const selectedVariant = useMemo(() => {
    if (!product?.data?.variants) return null;

    return (
      product.data.variants.find((variant) => variant.slug === varSlug) ||
      product.data.variants[0]
    );
  }, [product, varSlug]);

  if (productError) {
    return notFound();
  }

  if (productLoading) {
    return <MainContainer>Carregando...</MainContainer>;
  }

  if (!product || !selectedVariant) {
    return notFound();
  }

  const productVariant = product.data.variants;

  // Detalhes do produto baseados na variante selecionada
  const productDetails = {
    id: selectedVariant.productVariantId,
    description: selectedVariant.description,
    unit: product.data.unit,
    color: selectedVariant.color,
    width: selectedVariant.width,
    height: selectedVariant.height,
    weight: selectedVariant.weight,
    size: selectedVariant.size,
    rawMaterial: selectedVariant.rawMaterial,
  };

  // Produto para adicionar ao carrinho baseado na variante selecionada
  const cartProduct = {
    productVariantId: selectedVariant.productVariantId,
    name: selectedVariant.name,
    priceInCents: selectedVariant.priceInCents,
    imageUrl: selectedVariant.imageUrl || "",
    quantity: quantity,
  };

  return (
    <MainContainer>
      <section className="flex flex-col space-y-6 md:flex-row md:justify-around md:space-y-0 md:space-x-6">
        <aside className="md:w-md">
          <Image
            src={selectedVariant.imageUrl || ""}
            alt={selectedVariant.name}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />
        </aside>

        <section className="md:w-md">
          {/* DESCRIÇÃO */}
          <header>
            <HighLightTitle>{selectedVariant.name}</HighLightTitle>
            <div className="mt-3">
              <Subtitle>{product.data.category.name}</Subtitle>
            </div>
            <hr className="mt-3 mb-2" />
          </header>

          <section className="mb-8">
            <p className="text-shadow-amber-600">
              {selectedVariant.description}
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
                {formatCentsToBRL(selectedVariant.priceInCents)}
              </h2>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </section>
            <Subtitle>
              {formatCentsToBRL(selectedVariant.priceInCents * quantity)}
            </Subtitle>
          </main>

          <section className="flex flex-col justify-around space-y-3">
            <AddToCartButton product={cartProduct} />
            <BuyNowButton product={cartProduct} />
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
