import { ICart } from "@/src/interface/ICart";

const removeItemCartAction = (productVariantId: string, state: ICart) => {
  if (!state.cart) return state;

  return {
    cart: {
      ...state.cart,
      items: state.cart.items.filter(
        (cartItem) => cartItem.productVariantId !== productVariantId
      )
    }
  };
}

export { removeItemCartAction }