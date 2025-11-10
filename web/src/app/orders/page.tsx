import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { OrderListPage } from "@/src/components/pages/order-list-page";

const OrdersPage = async () => {
  return (
    <main className="flex h-screen flex-col">
      <NavMenu />
      <section>
        <OrderListPage />
      </section>
      <MainFooter />
    </main>
  );
};
export default OrdersPage;
