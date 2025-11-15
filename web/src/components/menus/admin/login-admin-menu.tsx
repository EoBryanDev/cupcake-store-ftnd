"use client";

import { ThemeToggle } from "@/src/components/buttons/theme-toggle";
import { useSession } from "@/src/hooks/useSession";
import { IUserInfo } from "@/src/interface/ILogin";

import Link from "next/link";
import { Button } from "../../ui/button";
import { LogOutIcon } from "lucide-react";
import { useCookie } from "@/src/helpers/get-cookie";
import { useEffect } from "react";
import { logoutAdmin } from "@/src/helpers/logout-admin";

export function LoginAdminMenu() {
  const cookie = useCookie("ck-store-key-admin");
  const userSession = useSession("user-admin");
  // useEffect(() => {
  //   if (!cookie) {
  //     userSession.remove();
  //   }
  // }, []);

  return (
    <header className="bg-card border-b">
      <div className="flex items-baseline justify-between px-4 py-4 sm:px-6">
        <div className="flex w-1/3 items-center space-x-2 sm:space-x-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            <Link href="/admin/dashboard" className="cursor-pointer">
              CK
            </Link>
          </h1>
        </div>

        <div className="flex w-2/3 items-center justify-end space-x-2 sm:space-x-4">
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {cookie && (
              <Button variant="ghost" className="cursor-pointer" onClick={()=> logoutAdmin()}>
                <LogOutIcon size={"1.2rem"} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
