import { calculateTotals } from "@/src/helpers/calculateTotals";
import { ICart } from "@/src/interface/ICart";

const removeItemCartAction = (productVariantId: string, state: ICart) => {
  if (!state.cart) return state;

  const updatedItems = state.cart.items.filter(
    (cartItem) => cartItem.productVariantId !== productVariantId
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
}

export { removeItemCartAction }