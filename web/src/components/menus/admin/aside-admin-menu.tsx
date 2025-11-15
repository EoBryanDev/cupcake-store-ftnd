"use client";

import { useSession } from "@/src/hooks/useSession";
import { IUserInfo } from "@/src/interface/ILogin";
import {
  BoxesIcon,
  LayoutDashboardIcon,
  ListIcon,
  NotepadTextIcon,
  PackageIcon,
  TruckIcon,
  WarehouseIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { useCookie } from "@/src/helpers/get-cookie";

const AsideAdminMenu = () => {
  const userSession = useSession("user-admin");
  const userInfo = userSession.get<IUserInfo>();
  const cookie = useCookie("ck-store-key-admin");

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-3 pt-4">
        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/dashboard"}
        >
          <LayoutDashboardIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Dashboard
          </span>
        </Link>

        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/orders"}
        >
          <NotepadTextIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Orders
          </span>
        </Link>

        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/products"}
        >
          <PackageIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Products
          </span>
        </Link>

        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/product-variants"}
        >
          <BoxesIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Products Variants
          </span>
        </Link>

        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/categories"}
        >
          <ListIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Categories
          </span>
        </Link>

        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/oper-areas"}
        >
          <TruckIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Oper. Areas
          </span>
        </Link>

        <Link
          className="mt-1 mb-2 flex cursor-pointer items-center justify-center gap-0 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3"
          href={"/admin/stock"}
        >
          <WarehouseIcon size="1.4rem" className="shrink-0 text-white" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            Stock
          </span>
        </Link>
      </div>

      {cookie && (
        <div className="flex items-center justify-center gap-0 border-t border-white/20 pt-4 pb-4 transition-all duration-700 ease-in-out group-hover:justify-start group-hover:gap-3">
          <Avatar className="text-accent-foreground h-9 w-9 shrink-0">
            <AvatarFallback>
              {userInfo?.firstName[0].toUpperCase() ?? ""}
              {userInfo?.lastName[0].toUpperCase() ?? ""}
            </AvatarFallback>
          </Avatar>

          <div className="max-w-0 min-w-0 overflow-hidden opacity-0 transition-all duration-700 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
            <h3 className="truncate text-sm font-semibold whitespace-nowrap">
              {userInfo?.firstName} {userInfo?.lastName}
            </h3>
            <span className="block truncate text-xs whitespace-nowrap text-white opacity-75">
              {userInfo?.email}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export { AsideAdminMenu };
