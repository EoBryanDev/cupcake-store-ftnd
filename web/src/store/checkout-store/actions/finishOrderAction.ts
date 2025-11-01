import useCartStore from "../../cart-store/useCartStore"

const finishOrderAction = () => {
  const { deleteCart } = useCartStore()

  deleteCart()
}

export { finishOrderAction }