import { ICart } from "@/src/interface/ICart";

const increaseQuantityAction = (productVariantId: string, state: ICart) => {
  if (!state.cart) return state;

  const updatedItems = state.cart.items.map((item) =>
    item.productVariantId === productVariantId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  return {
    cart: {
      ...state.cart,
      items: updatedItems
    }
  };
};

export { increaseQuantityAction }