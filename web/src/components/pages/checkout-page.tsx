"use client";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";
import { Stepper } from "../steppers/stepper";
import useCartStore from "@/src/store/cart-store/useCartStore";
import { notFound } from "next/navigation";

const CheckoutPage = () => {
  const { step } = useCheckoutStore();
  const { cart } = useCartStore();

  if (!cart?.items) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      <header className="mx-auto w-75">
        <nav>
          <Stepper
            steps={[
              { title: "Identification" },
              { title: "Summary" },
              { title: "Order" },
            ]}
            currentStep={step ?? 1}
          />
        </nav>
      </header>

      <aside></aside>

      <aside></aside>
    </main>
  );
};

export { CheckoutPage };
