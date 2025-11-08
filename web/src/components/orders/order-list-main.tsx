import { IOrder } from "@/src/interface/IOrder";
import { OrderItems } from "./order-list-items";

interface IOrderListProps {
  orders: IOrder[];
}

const OrderList = ({ orders }: IOrderListProps) => {
  return (
    <>
      {orders.map((order) => {
        return (
          <div key={order.orderId}>
            <h1>order</h1>
            <OrderItems items={order.items} />
          </div>
        );
      })}
    </>
  );
};

export { OrderList };
