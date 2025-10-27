"use client";

import { ThemeToggle } from "@/src/components/buttons/theme-toggle";

import Link from "next/link";
import { SliderMenu } from "./slider-menu";
import { OrderButton } from "../buttons/order-button";
import { UserButton } from "../buttons/user-button";
// import { SearchInput } from "../inputs/search-input";
interface INavMenuProps {
  token: { name: string; value: string } | undefined;
}

export function NavMenuDesktop({ token }: INavMenuProps) {
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

        <div className="flex w-1/3 items-center justify-center space-x-2 sm:space-x-8">
          <nav className="hidden items-center space-x-6 sm:flex">
            <div className="hover:text-primary flex items-center">
              <Link href="/" className="cursor-pointer text-sm">
                Home
              </Link>
            </div>
            <div className="hover:text-primary flex items-center">
              <Link href="/" className="cursor-pointer text-sm">
                Products
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className="hover:text-primary cursor-pointer text-sm"
              >
                Categories
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/search?page=1"
                className="hover:text-primary cursor-pointer text-sm"
              >
                Search
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex w-1/3 items-center justify-end space-x-2 sm:space-x-4">
          {/* <SearchInput /> */}

          {!token && (
            <Link href="/login" className="cursor-pointer">
              <UserButton />
            </Link>
          )}
          {token && <OrderButton />}
          <ThemeToggle />
          <SliderMenu />
        </div>
      </div>
    </header>
  );
}
