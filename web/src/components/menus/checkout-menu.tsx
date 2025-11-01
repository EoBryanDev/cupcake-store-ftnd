"use client";

import { ThemeToggle } from "@/src/components/buttons/theme-toggle";

import Link from "next/link";
import { SliderMenu } from "./slider-menu";
import { OrderButton } from "../buttons/order-button";
import { UserButton } from "../buttons/user-button";
import { useCookie } from "@/src/helpers/get-cookie";
// import { SearchInput } from "../inputs/search-input";

export function CheckoutMenu() {
  return (
    <header className="bg-card border-b">
      <div className="flex items-baseline justify-between px-4 py-4 sm:px-6">
        <div className="flex w-1/3 items-center space-x-2 sm:space-x-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            <Link href="/" className="cursor-pointer">
              CK
            </Link>
          </h1>
        </div>

        <div className="flex w-2/3 items-center justify-end space-x-2 sm:space-x-4">
          {/* <SearchInput /> */}

          <OrderButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
