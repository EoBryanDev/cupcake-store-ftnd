import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ICartStore } from '../../interface/ICart';
import { addItemCartAction } from './actions/addItemCartAction';
import { removeItemCartAction } from './actions/removeItemCartAction';
import { increaseQuantityAction } from './actions/increaseQuantityAction';
import { decreaseQuantityAction } from './actions/decreaseQuantityAction';

const useCartStore = create<ICartStore>()(
  persist(
    (set) => ({
      cart: null,
      addItemCart: (productVariantId) =>
        set((state) => addItemCartAction(productVariantId, state)),
      increaseQuantity: (productVariantId) =>
        set((state) => increaseQuantityAction(productVariantId, state)),
      decreaseQuantity: (productVariantId) =>
        set((state) => decreaseQuantityAction(productVariantId, state)),
      removeItemCart: (productVariantId) =>
        set((state) => (removeItemCartAction(productVariantId, state))),
      deleteCart: () => set({ cart: null }),
    }),
    {
      name: 'cart-storage', // nome da chave no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartStore;