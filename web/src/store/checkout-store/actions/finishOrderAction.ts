import useCartStore from "../../cart-store/useCartStore"

const finishOrderAction = () => {
  useCartStore.getState().deleteCart()
}

export { finishOrderAction }