import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { OrderListPage } from "@/src/components/pages/order-list-page";

const OrdersPage = async () => {
  return (
    <>
      <NavMenu />
      <OrderListPage />
      <MainFooter />
    </>
  );
};
export default OrdersPage;
