interface ICartItem {
  productVariantId: string;
  name: string;
  priceInCents: number;
  imageUrl: string;
  quantity: number;
}
interface ICart {
  cart: {
    cart_id: string;
    created_at: string;
    items: Array<ICartItem>;
    total?: number;
    totalItems?: number;
  } | null;
}

interface ICartStore extends ICart {
  addItemCart: (item: ICartItem) => void;
  increaseQuantity: (productVariantId: string) => void;
  decreaseQuantity: (productVariantId: string) => void;
  removeItemCart: (productVariantId: string) => void;
  deleteCart: () => void;
}

export type { ICart, ICartItem, ICartStore }