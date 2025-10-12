"use client";

import { ThemeToggle } from "@/src/components/buttons/theme-toggle";
import { NotepadText, Menu } from "lucide-react";

import Link from "next/link";
import { SliderMenu } from "./slider-menu";
import { OrderButton } from "../buttons/order-button";

export function NavMenuDesktop() {
  return (
    <header className="bg-card border-b">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-2 sm:space-x-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            <Link href="/v1/dashboard" className="cursor-pointer">
              CK
            </Link>
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-8">
          <nav className="hidden items-center space-x-6 sm:flex">
            <div className="hover:text-primary flex items-center space-x-2">
              <Link href="/" className="cursor-pointer text-sm">
                Home
              </Link>
            </div>
            <div className="hover:text-primary flex items-center space-x-2">
              <Link href="/" className="cursor-pointer text-sm">
                Products
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="hover:text-primary cursor-pointer text-sm"
              >
                Categories
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <OrderButton />
          <ThemeToggle />
          <SliderMenu />
        </div>
      </div>
    </header>
  );
}
