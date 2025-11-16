"use client";
import useCartStore from "@/src/store/cart-store/useCartStore";
import { CartItem } from "./cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export const Cart = () => {
  const { cart } = useCartStore();
  const existCartItems = cart ? (cart.items.length > 0 ? true : false) : false;

  return (
    <div className="flex flex-col">
      {!existCartItems ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="mb-1 text-sm font-medium">Cart is empty</p>
          <p className="text-primary mb-4 text-xs">Explore our products</p>
          <Link
            href="/search?page=1"
            className="hover:text-primary flex items-center gap-2 text-sm transition-colors"
          >
            <SearchIcon size={16} className="text-primary" />
            <span>Search New Products</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart?.items.map((item, index) => (
            <div key={item.productVariantId}>
              <CartItem
                id={item.productVariantId}
                productVariantId={item.productVariantId}
                productVariantName={item.name}
                productVariantImageUrl={item.imageUrl}
                productVariantPriceInCents={item.priceInCents}
                quantity={item.quantity}
              />
              {index < cart.items.length - 1 && <hr className="mt-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
