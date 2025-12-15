import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { OrderListPage } from "@/src/components/pages/order-list-page";
import { LoadingState } from "@/src/components/loading-state";
import { Suspense } from "react";

const OrdersPage = async () => {
  return (
    <main className="flex min-h-screen flex-col">
      <NavMenu />
      <section className="flex-1">
        <Suspense
          fallback={
            <LoadingState messageKey="list.loading" ns="orders" />
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
