import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import useCartStore from "@/src/store/cart-store/useCartStore";
// interface ICartSummaryOrderProps {
//   orders: Array<{
//     orderId: string;
//     totalPriceInCents: number;
//     status: string;
//     createdAt: string;
//     items: Array<{
//       orderItemId: string;
//       imageUrl: string;
//       name: string;
//       quantity: number;
//       priceInCents: number;
//     }>;
//   }>;
// }

interface ICartSummaryOrderProps {
  totalPriceInCents: number;
  products: Array<{
    orderItemId: string;
    imageUrl: string;
    name: string;
    quantity: number;
    priceInCents: number;
  }>;
}

const CartSummaryOrder = ({
  totalPriceInCents,
  products,
}: ICartSummaryOrderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(totalPriceInCents ?? 0)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Shipping</p>
          <p className="text-muted-foreground text-sm font-medium">Free</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(totalPriceInCents ?? 0)}
          </p>
        </div>

        <div className="py-3">
          <hr />
        </div>

        {products.map((product) => (
          <div className="flex items-center justify-between" key={product.name}>
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={78}
                height={78}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{product.name}</p>
                {/* <p className="text-muted-foreground text-xs font-medium">
                    {product.variantName}
                  </p> */}
              </div>
            </div>
            <div>
              <div className="flex flex-col items-end justify-center gap-2">
                <p className="text-muted-foreground text-xs">
                  {product.quantity}x
                </p>
                <p className="text-sm font-bold">
                  {formatCentsToBRL(product.priceInCents)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { CartSummaryOrder };
