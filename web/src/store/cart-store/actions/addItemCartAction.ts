import { calculateTotals } from "@/src/helpers/calculateTotals";
import { ICart, ICartItem } from "@/src/interface/ICart";

const addItemCartAction = (item: ICartItem, state: ICart) => {

  if (!state.cart) {
    return {
      cart: {
        cart_id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        items: [item],
        totalItems: item.quantity,
        total: item.priceInCents * item.quantity,
      }
    };
  }

  const existingItemIndex = state.cart.items.findIndex(
    (cartItem) => cartItem.productVariantId === item.productVariantId
  );

  let updatedItems: ICartItem[];

  if (existingItemIndex > -1) {
    updatedItems = state.cart.items.map((cartItem, index) =>
      index === existingItemIndex
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        : cartItem
    );
  } else {
    updatedItems = [...state.cart.items, item];
  }

  const { totalItems, total } = calculateTotals(updatedItems);
  return {
    cart: { ...state.cart, items: updatedItems, totalItems, total }
  };
}

export { addItemCartAction }