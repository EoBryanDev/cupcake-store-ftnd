import { formatCentsToUSD } from "@/src/helpers/format-cents-usdformated";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import useCartStore from "@/src/store/cart-store/useCartStore";
import { ImageIcon } from "lucide-react";

const CartSummary = () => {
  const { cart } = useCartStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <p className="font-medium">{formatCentsToUSD(cart?.total ?? 0)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Shipping</p>
            <p className="font-medium">Free</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-semibold">
            <p>Total</p>
            <p>{formatCentsToUSD(cart?.total ?? 0)}</p>
          </div>
        </div>

        <hr />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Products</h4>
          {cart?.items.map((product, index) => (
            <div key={product.productVariantId}>
              <div className="flex gap-3">
                <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
                  {!product.imageUrl && (
                    <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                      <ImageIcon className="text-muted-foreground min-h-15 w-5 min-w-15 object-cover" />
                    </div>
                  )}
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority={false}
                    />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <p className="line-clamp-2 text-sm leading-tight font-semibold">
                    {product.name}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground text-xs">
                      Qty: {product.quantity}
                    </span>
                    <p className="text-sm font-bold">
                      {formatCentsToUSD(
                        product.priceInCents * product.quantity,
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {index < cart.items.length - 1 && <hr className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
