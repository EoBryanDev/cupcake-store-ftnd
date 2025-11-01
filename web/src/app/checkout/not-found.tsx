// app/not-found.tsx
import { MainContainer } from "@/src/components/containers/main-container";
import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { NotFoundPage } from "@/src/components/pages/not-found-page";
import { ShoppingCartIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col">
      <NavMenu />
      <main className="flex flex-1 items-center justify-center">
        <NotFoundPage
          error={"404"}
          title={"CART ITEMS NOT FOUND"}
          description={"There is not possible keep checkout without cart items"}
          link={"/search?page=1"}
          btnMessage={"Add items to cart"}
        >
          <ShoppingCartIcon size={"5rem"} className="mb-4" />
        </NotFoundPage>
      </main>
      <MainFooter />
    </div>
  );
}
