import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { OrderListPage } from "@/src/components/pages/order-list-page";
import { Suspense } from "react";

const OrdersPage = async () => {
  return (
    <main className="flex h-screen flex-col justify-between">
      <NavMenu />
      <section>
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              Loading orders...
            </div>
          }
        >
          <OrderListPage />
        </Suspense>
      </section>
      <MainFooter />
    </main>
  );
};
export default OrdersPage;
