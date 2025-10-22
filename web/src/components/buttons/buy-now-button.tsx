"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface IBuyNowButtonProps {
  productVariantId: string;
  quantity: number;
}
const BuyNowButton = ({ productVariantId, quantity }: IBuyNowButtonProps) => {
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
      className="bg-primary rounded-full text-white md:rounded-md"
      size="lg"
      // variant="outline"
      // disabled={isPending}
      // onClick={() => mutate()}
    >
      {" "}
      {/* {isPending && <Loader2 className="animate-spin" />}  */}
      Buy Now{" "}
    </Button>
  );
};
export default BuyNowButton;
