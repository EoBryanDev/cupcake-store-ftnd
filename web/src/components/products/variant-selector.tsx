import { IProductVariant } from "@/src/interface/IProductVariant";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  selectedProdSlug: string;
  variants: IProductVariant[];
}

const VariantSelector = ({
  selectedVariantSlug,
  selectedProdSlug,
  variants,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/products/${selectedProdSlug}/variants/${variant.slug}`}
          key={variant.productId}
          className={
            selectedVariantSlug === variant.slug
              ? "border-primary rounded-xl border-2"
              : ""
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl || ""}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
