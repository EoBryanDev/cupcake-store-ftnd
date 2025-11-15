import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import useCartStore from "@/src/store/cart-store/useCartStore";
import CheckoutButton from "../buttons/checkout-button";
import { useCookie } from "@/src/helpers/get-cookie";

const CartCheckout = () => {
  const { cart } = useCartStore();

  const cookie = useCookie("ck-store-key");
  const existCartItems = cart ? (cart.items.length > 0 ? true : false) : false;
  const total = cart?.totalItems ?? 0;

  return (
    <>
      {existCartItems && (
        <div className="flex h-full flex-col px-5 py-2 pb-5">
          <div className="text-primary text-md my-2 flex items-center justify-between font-medium">
            <p>
              {total} {total > 1 ? "items" : "item"}{" "}
            </p>
          </div>
          <div className="text-md flex items-center justify-between font-medium">
            <p>Subtotal</p>
            <p>{formatCentsToBRL(cart?.total ?? 0)}</p>
          </div>

          <div className="text-md flex items-center justify-between font-medium">
            <p>Delivery</p>
            <p>-</p>
          </div>
          <div className="text-md flex items-center justify-between font-medium">
            <p>Discount</p>
            <p>-</p>
          </div>

          <div className="mb-4 flex items-center justify-between text-2xl font-medium">
            <p>Total</p>
            <p>{formatCentsToBRL(cart?.total ?? 0)}</p>
          </div>

          <footer className="flexitems-center justify-center">
            <CheckoutButton
              disabled={!cookie}
              noLoginMsg="To checkout login first"
              link={"/checkout"}
            />
          </footer>
        </div>
      )}
    </>
  );
};

export { CartCheckout };
