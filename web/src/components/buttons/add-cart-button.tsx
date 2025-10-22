"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface IAddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}
const AddToCartButton = ({
  productVariantId,
  quantity,
}: IAddToCartButtonProps) => {
  // const queryClient = useQueryClient();
  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["addProductToCart", productVariantId, quantity],
  //   mutationFn: () => addProductToCart({ productVariantId, quantity }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cart"] });
  //   },
  // });
  return (
    <Button
      className="bg-secondary text-foreground rounded-full md:rounded-md"
      size="lg"
      variant="outline"
      // disabled={isPending}
      // onClick={() => mutate()}
    >
      {" "}
      {/* {isPending && <Loader2 className="animate-spin" />}  */}
      Add to Cart{" "}
    </Button>
  );
};
export default AddToCartButton;
