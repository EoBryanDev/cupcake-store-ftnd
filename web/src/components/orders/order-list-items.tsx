import { ICartItem } from "@/src/interface/ICart";

interface IOrderItemsProps {
  items: ICartItem[];
}

const OrderItems = ({ items }: IOrderItemsProps) => {
  return (
    <div>
      <div>hi</div>
    </div>
  );
};

export { OrderItems };
