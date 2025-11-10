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

interface IOrderListProps {
  orders: IOrder[];
}

const OrderList = ({ orders }: IOrderListProps) => {
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
                      {order.status === "PAID" && <Badge>Pago</Badge>}
                      {order.status === "PENDING" && (
                        <Badge variant="outline">Pagamento Pendente</Badge>
                      )}
                      {order.status === "CANCELED" && (
                        <Badge variant="destructive">Pago</Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <p>
                          Pedido feito em{" "}
                          {new Date(order.createdAt || "").toLocaleDateString(
                            "pt-BR",
                          )}{" "}
                          às{" "}
                          {new Date(order.createdAt || "").toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CartSummaryOrder
                      // subtotalInCents={order.totalPriceInCents}
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
