import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import {
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveFromCart,
} from "./cart-action-handlers";
interface ICartItemProps {
  id: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: ICartItemProps) => {
  return (
    <div className="flex gap-3">
      <div className="bg-muted relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          fill
          sizes="80px"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-2 flex-1 text-sm leading-tight font-semibold">
            {productVariantName}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-destructive h-7 w-7 flex-shrink-0"
            onClick={() => handleRemoveFromCart(productVariantId)}
          >
            <TrashIcon size={16} />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex w-[90px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-6 w-6 p-0"
              variant="ghost"
              size="icon"
              onClick={() => handleDecreaseQuantity(productVariantId)}
            >
              <MinusIcon size={14} />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-6 w-6 p-0"
              variant="ghost"
              size="icon"
              onClick={() => handleIncreaseQuantity(productVariantId)}
            >
              <PlusIcon size={14} />
            </Button>
          </div>

          <p className="text-sm font-bold">
            {formatCentsToBRL(productVariantPriceInCents * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export { CartItem };
