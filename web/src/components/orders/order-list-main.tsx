import { IOrder } from "@/src/interface/IOrder";
import { OrderItems } from "./order-list-items";
import { Card, CardContent } from "../ui/card";
import { CartSummaryOrder } from "../carts/cart-summary-order";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { getTimeSeparator } from "@/src/helpers/get-time-separator-user-locate-based";
import { formatDateToUserLocale } from "@/src/helpers/format-date-to-user-locate";
import { formatTimeToUserLocale } from "@/src/helpers/format-time-to-user-locate";

interface IOrderListProps {
  orders: IOrder[];
}

const OrderList = ({ orders }: IOrderListProps) => {
  const timeSeparator = getTimeSeparator();

  return (
    <>
      <div className="space-y-5">
        {orders.map((order) => (
          <Card key={order.orderId}>
            <CardContent>
              <Accordion type="single" collapsible key={order.orderId}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-col gap-1">
                      {order.status === "PAID" && <Badge>Paid</Badge>}
                      {order.status === "PENDING" && (
                        <Badge variant="outline">Payment Pending</Badge>
                      )}
                      {order.status === "CANCELED" && (
                        <Badge variant="destructive">Cancelled</Badge>
                      )}
                      {order.status === "FAILED" && (
                        <Badge variant="destructive">Failled</Badge>
                      )}
                      {order.status === "SHIPPED" && (
                        <Badge className="bg-sky-500">Shipped</Badge>
                      )}
                      {order.status === "DELIVERED" && (
                        <Badge className="bg-green-500">Delivered</Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <p>
                          Order made at{" "}
                          {formatDateToUserLocale(order.createdAt || "")}{" "}
                          {timeSeparator}{" "}
                          {formatTimeToUserLocale(order.createdAt || "")}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CartSummaryOrder
                      totalPriceInCents={order.totalPriceInCents}
                      products={order.items.map((item) => ({
                        orderItemId: item.orderItemId || "",
                        name: item.name,
                        quantity: item.quantity,
                        priceInCents: item.priceInCents,
                        imageUrl: item.imageUrl,
                      }))}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export { OrderList };
