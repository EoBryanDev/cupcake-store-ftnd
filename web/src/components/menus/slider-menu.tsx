import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { useSession } from "@/src/hooks/useSession";
import { IUserInfo } from "@/src/interface/ILogin";
import useBreakpoint from "@/src/hooks/useBreakPoint";
import { Cart } from "../carts/cart";
import { CartCheckout } from "../carts/cart-checkout";
import { logout } from "@/src/helpers/logout";

function SliderMenu() {
  const { isMobile } = useBreakpoint();

  const userSession = useSession("user");
  const userInfo = userSession.get<IUserInfo>();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" size="icon" className="cursor-pointer">
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex max-w-md flex-col p-0 sm:max-w-lg"
      >
        <SheetHeader className="flex-shrink-0 border-b px-4 py-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex-shrink-0 border-b px-4 py-4">
          {userInfo ? (
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="flex-shrink-0">
                  <AvatarFallback>
                    {userInfo?.firstName[0]?.toUpperCase()}
                    {userInfo?.lastName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </h3>
                  <span className="text-muted-foreground block truncate text-xs">
                    {userInfo?.email}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={() => logout()}
              >
                <LogOutIcon />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">
                Hello! Sign in your account!
              </h2>
              <Button
                size="icon"
                asChild
                variant="default"
                className="flex-shrink-0 cursor-pointer"
              >
                <Link href="/login">
                  {userInfo ? <LogOutIcon /> : <LogInIcon />}
                </Link>
              </Button>
            </div>
          )}
        </div>

        {isMobile && (
          <nav className="flex-shrink-0 border-b px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="hover:text-primary flex items-center gap-2 text-sm"
              >
                <HomeIcon size={18} className="text-primary flex-shrink-0" />
                <span>Home</span>
              </Link>
              <Link
                href="/search?page=1"
                className="hover:text-primary flex items-center gap-2 text-sm"
              >
                <SearchIcon size={18} className="text-primary flex-shrink-0" />
                <span>Search</span>
              </Link>
            </div>
          </nav>
        )}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex-shrink-0 px-4 py-3">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
          </div>
          <div className="flex-1 overflow-y-auto px-4">
            <Cart />
          </div>
        </div>

        <div className="bg-background flex-shrink-0 border-t px-4">
          <CartCheckout />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { SliderMenu };
