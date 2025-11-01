import { ICartItem } from "../interface/ICart";

const calculateTotals = (items: ICartItem[]) => {
  const totalItems = items.reduce((acc, currentItem) => acc + currentItem.quantity, 0);
  const total = items.reduce((acc, currentItem) => acc + (currentItem.priceInCents * currentItem.quantity), 0);
  return { totalItems, total };
};

export { calculateTotals }