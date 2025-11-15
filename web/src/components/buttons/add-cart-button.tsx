"use client";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { handleAddToCart } from "../carts/cart-action-handlers";
import { ICartItem } from "@/src/interface/ICart";
import { useState } from "react";

interface IAddToCartButtonProps {
  product: ICartItem;
}
const AddToCartButton = ({ product }: IAddToCartButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  return (
    <Button
      className="bg-secondary text-foreground rounded-full md:rounded-md"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => {
        try {
          setIsPending(true);
          handleAddToCart(product);
        } catch (error) {
          setIsPending(false);
        } finally {
          setIsPending(false);
        }
      }}
    >
      {" "}
      {isPending && <Loader2 className="animate-spin" />}
      Add to Cart{" "}
    </Button>
  );
};
export default AddToCartButton;
