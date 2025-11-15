import {
  HomeIcon,
  ListIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBag,
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
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0 px-5">
            <hr className="mr-auto mb-2 ml-auto w-50" />
            {userInfo ? (
              <>
                <div className="flex justify-between space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {userInfo?.firstName[0]?.toUpperCase()}
                        {userInfo?.lastName[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">
                        {userInfo?.firstName} {userInfo?.lastName}
                      </h3>
                      <span className="text-muted-foreground block text-xs">
                        {userInfo?.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => logout()}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              </>
            ) : (
              <div className="my-2 flex items-center justify-between">
                <h2 className="font-semibold">Hello! Sign in your account !</h2>
                <Button size="icon" asChild variant="default">
                  <Link href="/login">
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}

            {isMobile && (
              <>
                <hr className="mt-2 mr-auto ml-auto w-50" />
                <aside className="px-5">
                  <nav className="flex flex-col items-start space-y-2">
                    <div className="hover:text-primary flex items-center">
                      <HomeIcon size={"1.2rem"} className="text-primary mr-2" />
                      <Link href="/" className="cursor-pointer text-sm">
                        Home
                      </Link>
                    </div>
                    {/* <div className="hover:text-primary flex items-center">
                      <ShoppingBag
                        size={"1.2rem"}
                        className="text-primary mr-2"
                      />
                      <Link href="/" className="cursor-pointer text-sm">
                        Products
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <ListIcon size={"1.2rem"} className="text-primary mr-2" />
                      <Link
                        href="/"
                        className="hover:text-primary cursor-pointer text-sm"
                      >
                        Categories
                      </Link>
                    </div> */}
                    <div className="flex items-center">
                      <SearchIcon
                        size={"1.2rem"}
                        className="text-primary mr-2"
                      />
                      <Link
                        href="/search?page=1"
                        className="hover:text-primary cursor-pointer text-sm"
                      >
                        Search
                      </Link>
                    </div>
                  </nav>
                </aside>
              </>
            )}
          </div>

          <div className="flex-grow overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <Cart />
          </div>

          <div className="flex-shrink-0">
            <hr className="mr-auto ml-auto w-50" />
            <CartCheckout />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { SliderMenu };
