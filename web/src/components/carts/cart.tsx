"use client";
import useCartStore from "@/src/store/useCartStore";
import { CartItem } from "./cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export const Cart = () => {
  const { cart } = useCartStore();
  const existCartItems = cart ? (cart.items.length > 0 ? true : false) : false;

  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <div className="flex h-full max-h-full flex-col overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {!existCartItems && (
              <div className="flex flex-col items-center justify-center">
                <p>Cart is empty</p>
                <p className="text-primary text-sm">Explore our products</p>
                <div className="mt-4 flex items-center">
                  <SearchIcon size={"1.2rem"} className="text-primary mr-2" />
                  <Link
                    href="/search?page=1"
                    className="hover:text-primary cursor-pointer text-sm"
                  >
                    Search New Products
                  </Link>
                </div>
              </div>
            )}
            {cart?.items.map((item) => (
              <CartItem
                key={item.productVariantId}
                id={item.productVariantId}
                productVariantId={item.productVariantId}
                productVariantName={item.name}
                productVariantImageUrl={item.imageUrl}
                productVariantPriceInCents={item.priceInCents}
                quantity={item.quantity}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
