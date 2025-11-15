import { ICartItem } from "./ICart";
import { IPagination } from "./IProductVariant";

interface IOrderItems extends ICartItem {
  orderItemId?: string;
  orderId?: string;
  color?: string;
  createdAt?: string;
}

interface IOrder {
  orderId?: string;
  receiverName: string;
  street: string;
  number: string;
  complement: string;
  referencePoint: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  shippingCompany: string;
  shippingTax: number;
  discount: number;
  totalPriceInCents: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED" | "FAILED";
  paymentType: "BANK_SLIP" | "CREDIT_CARD" | "DEBIT_CARD";
  approval?: "APPROVED" | "PENDING" | "REJECTED";
  createdAt?: string;
  items: IOrderItems[];
}
interface IOrderResponse {
  data: IOrder[] | null;
  pagination: IPagination;
  error: string;
};

export type { IOrder, IOrderResponse }
