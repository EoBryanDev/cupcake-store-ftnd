import Image from "next/image";
import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { formatCentsToUSD } from "@/src/helpers/format-cents-usdformated";
import { Card, CardContent } from "../ui/card";
import { IProduct } from "@/src/interface/IProductVariant";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  return (
    <Link
      href={`/products/${product?.slug}/variants/${product?.variants[0]?.slug}`}
      className="group block"
    >
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="bg-muted relative aspect-square w-full overflow-hidden">
            {(!product?.variants[0]?.imageUrl && (
              <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                <ImageIcon className="text-muted-foreground min-h-15 min-w-15 object-cover" />
              </div>
            )) || (
              <Image
                src={product?.variants[0]?.imageUrl || ""}
                alt={product?.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />
            )}
          </div>

          <div className="space-y-2 p-3 md:p-4">
            <h3 className="line-clamp-2 min-h-[2.5rem] text-sm leading-tight font-semibold md:text-base">
              {product?.name}
            </h3>

            {product?.category && (
              <p className="text-muted-foreground line-clamp-1 text-xs">
                {product?.category?.name}
              </p>
            )}

            <div className="flex items-center justify-between pt-1">
              <p className="text-base font-bold md:text-lg">
                {formatCentsToUSD(product?.variants[0]?.priceInCents || 0)}
              </p>

              {/* {product.isNew && (
                <span className="bg-primary rounded-full px-2 py-0.5 text-xs font-medium text-white">
                  New
                </span>
              )} */}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { ProductCard };
