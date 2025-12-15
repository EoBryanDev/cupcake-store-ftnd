import { formatCentsToUSD } from "@/src/helpers/format-cents-usdformated";
import { IProduct } from "@/src/interface/IProductVariant";
import { cn } from "@/src/lib/utils";
import { ImageIcon } from "lucide-react";
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
  const firstVariant = product?.variants[0];

  return (
    <Link
      href={`/products/${product?.slug}/variants/${firstVariant?.slug}`}
      className="flex flex-col gap-4"
    >
      <div className="relative aspect-square w-[200px] shrink-0">
        {!firstVariant?.imageUrl && (
          <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
            <ImageIcon className="text-muted-foreground h-5 min-h-15 w-5 min-w-15 object-cover" />
          </div>
        )}
        {firstVariant?.imageUrl && (
          <Image
            src={
              firstVariant?.imageUrl ??
              "https://pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev/cupcake_halloween.png"
            }
            alt={firstVariant?.name}
            fill
            className="rounded-3xl object-cover"
            // width={0}
            // height={0}
            // sizes="100vw"
            // className="min-h-[300px] w-auto min-w-[300px] rounded-3xl"
          />
        )}
      </div>
      <div
        className={cn(
          "flex max-w-[200px] flex-col gap-1",
          textContainerClassName,
        )}
      >
        <p className="truncate text-sm font-medium">{product?.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product?.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToUSD(firstVariant?.priceInCents || 0)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
