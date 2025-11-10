"use client";

import { ThemeToggle } from "@/src/components/buttons/theme-toggle";

import Link from "next/link";

export function LoginAdminMenu() {
  return (
    <header className="bg-card border-b">
      <div className="flex items-baseline justify-between px-4 py-4 sm:px-6">
        <div className="flex w-1/3 items-center space-x-2 sm:space-x-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            <Link href="/admin/login" className="cursor-pointer">
              CK
            </Link>
          </h1>
        </div>

        <div className="flex w-2/3 items-center justify-end space-x-2 sm:space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
