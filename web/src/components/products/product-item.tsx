import { formatCentsToBRL } from "@/src/helpers/money";
import { IProduct } from "@/src/interface/IProductVariant";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IProductItemProps {
  product: IProduct;
  textContainerClassName?: string;
}

const ProductItem = ({
  product,
  textContainerClassName,
}: IProductItemProps) => {
  const firstVariant = product.variants[0];

  return (
    <Link
      href={`/products/${product.slug}/variants/${firstVariant.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={
          firstVariant.imageUrl ??
          "https://pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev/cupcake_halloween.png"
        }
        alt={firstVariant.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto min-h-[300px] w-auto min-w-[300px] rounded-3xl object-cover"
      />
      <div
        className={cn(
          "flex max-w-[200px] flex-col gap-1",
          textContainerClassName,
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
