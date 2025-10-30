import { ICart, ICartItem } from "@/src/interface/ICart";

const decreaseQuantityAction = (productVariantId: string, state: ICart) => {
  if (!state.cart) return state;

  const updatedItems = state.cart.items
    .map((item) => {
      if (item.productVariantId === productVariantId) {
        const newQuantity = item.quantity - 1;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    })
    .filter((item): item is ICartItem => item !== null);

  return {
    cart: {
      ...state.cart,
      items: updatedItems
    }
  };
};

export { decreaseQuantityAction }