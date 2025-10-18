"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { MainContainer } from "../containers/main-container";
import { formatCentsToBRL } from "@/src/helpers/money";
import { useProductVariantByIdQuery } from "@/src/hooks/queries/useProductVariantBySlug";

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
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant[0].imageUrl || ""}
          alt={productVariant[0].name}
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-full object-cover"
        />

        {/* <div className="px-5">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.variants}
          />
        </div> */}

        <div className="px-5">
          {/* DESCRIÇÃO */}
          <h2 className="text-lg font-semibold">{product.data.name}</h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant[0].name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant[0].priceInCents)}
          </h3>
        </div>

        {/* <ProductActions productVariantId={productVariant.id} /> */}

        <div className="px-5">
          <p className="text-shadow-amber-600">
            {productVariant[0].description}
          </p>
        </div>

        {/* <ProductList products={likelyProducts} /> */}
      </div>
    </MainContainer>
  );
};

export { ProductDetailPage };
