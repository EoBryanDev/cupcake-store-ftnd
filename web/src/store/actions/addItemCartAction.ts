import { ICart } from "@/src/interface/ICart";

const addItemCartAction = (item: any, state: ICart) => {
  if (!state.cart) {
    return {
      cart: {
        cart_id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        items: [item]
      }
    };
  }

  const existingItemIndex = state.cart.items.findIndex(
    (cartItem) => cartItem.productVariantId === item.productVariantId
  );

  if (existingItemIndex > -1) {
    const updatedItems = [...state.cart.items];
    updatedItems[existingItemIndex].quantity += item.quantity;
    return {
      cart: {
        ...state.cart,
        items: updatedItems
      }
    };
  }

  return {
    cart: {
      ...state.cart,
      items: [...state.cart.items, item]
    }
  };
}

export { addItemCartAction }