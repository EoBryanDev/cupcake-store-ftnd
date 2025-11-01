import { calculateTotals } from "@/src/helpers/calculateTotals";
import { ICart, ICartItem } from "@/src/interface/ICart";

const increaseQuantityAction = (productVariantId: string, state: ICart) => {

  if (!state.cart) return state;

  const updatedItems: ICartItem[] = state.cart.items.map((item) =>
    item.productVariantId === productVariantId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  const { totalItems, total } = calculateTotals(updatedItems);

  return {
    cart: {
      ...state.cart,
      items: updatedItems,
      totalItems,
      total,
    }
  };
};

export { increaseQuantityAction }