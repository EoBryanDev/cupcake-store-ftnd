"use client";
import { Button } from "../ui/button";
import { ICartItem } from "@/src/interface/ICart";
import { useSession } from "@/src/hooks/useSession";
import { useRouter } from "next/navigation";
import { handleAddToCart } from "../carts/cart-action-handlers";
import { useEffect, useState } from "react";
import { IUserInfo } from "@/src/interface/ILogin";
import useCartStore from "@/src/store/cart-store/useCartStore";
import { AlertCircle, Loader2 } from "lucide-react";

interface IBuyNowButtonProps {
  product: ICartItem;
}

const BuyNowButton = ({ product }: IBuyNowButtonProps) => {
  const [session, setSession] = useState<IUserInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { get } = useSession("user");
  const { cart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const userSession = get<IUserInfo>();
    setSession(userSession);
  }, []);

  const handleBuyNow = async () => {
    try {
      setIsProcessing(true);

      handleAddToCart(product);

      await new Promise((resolve) => setTimeout(resolve, 100));

      router.push("/checkout");
    } catch (error) {
      console.error("Error processing buy now:", error);
      setIsProcessing(false);
    }
  };

  if (!session) {
    return (
      <div className="flex w-full flex-col gap-2">
        <Button
          className="w-full rounded-full md:rounded-md"
          size="lg"
          disabled
          variant="secondary"
        >
          Buy Now
        </Button>
        <div className="bg-destructive/10 flex items-start gap-1.5 rounded-md p-2">
          <AlertCircle
            size={14}
            className="text-destructive mt-0.5 flex-shrink-0"
          />
          <p className="text-destructive text-xs leading-tight">
            To buy now you must be logged in
          </p>
        </div>
      </div>
    );
  }

  return (
    <Button
      className="bg-primary w-full rounded-full text-white md:rounded-md"
      size="lg"
      onClick={handleBuyNow}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Buy Now"
      )}
    </Button>
  );
};

export default BuyNowButton;
