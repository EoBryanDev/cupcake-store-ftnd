import { CheckCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";

const OrderSuccess = () => {
  const { order_id } = useCheckoutStore();
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-2xl font-semibold">
            Order {order_id} was created successfully
          </h2>
          <p className="text-muted-foreground mb-6">
            Your order is processing! Follow up on your order on 'My Orders'
          </p>

          <CheckCircleIcon size={"5rem"} className="mb-4" />
          <Button asChild>
            <Link href={"/orders"}>Go to my orders</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export { OrderSuccess };
