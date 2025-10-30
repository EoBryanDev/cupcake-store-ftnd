import { ICartItem } from "@/src/interface/ICart";
import useCartStore from "@/src/store/useCartStore";
import { toast } from "sonner";

export const handleAddToCart = (item: ICartItem) => {
  const { addItemCart } = useCartStore.getState();
  try {
    addItemCart(item);
    toast.success(`Product ${item.name} added to cart!`)
  } catch (error) {
    toast.error('Error adding product to cart!')
  }
};

export const handleIncreaseQuantity = (productVariantId: string) => {
  const { increaseQuantity } = useCartStore.getState();
  increaseQuantity(productVariantId);
};

export const handleDecreaseQuantity = (productVariantId: string) => {
  const { decreaseQuantity } = useCartStore.getState();
  decreaseQuantity(productVariantId);
};

export const handleRemoveFromCart = (productVariantId: string) => {
  const { removeItemCart, cart } = useCartStore.getState();
  const item = cart?.items.find(item => item.productVariantId === productVariantId);

  try {
    removeItemCart(productVariantId);
    toast.success(`Product ${item?.name} removed from cart!`)
  } catch (error) {
    toast.error('Error removing product from cart!')

  }
};

export const handleClearCart = () => {
  const { deleteCart } = useCartStore.getState();

  try {
    deleteCart();
    toast.success('Cart cleared!')
  } catch (error) {
    toast.error('Error clearing cart!')
  }
};