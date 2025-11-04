"use client";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";
import { Step, Stepper } from "../steppers/stepper";
import useCartStore from "@/src/store/cart-store/useCartStore";
import { notFound } from "next/navigation";
import CartSummary from "../carts/cart-summary";
import Addresses from "../adresses/address";

const CheckoutPage = () => {
  const { step } = useCheckoutStore();
  const { cart } = useCartStore();

  const generateSteps = (count: number): Step[] => {
    const stepNames = [
      { title: "Identification", description: "" },
      { title: "Payment Method", description: "" },
      { title: "Confirmation", description: "" },
      { title: "Order", description: "" },
    ];
    return stepNames.slice(0, count);
  };
  const steps = generateSteps(4);

  if (!cart?.items) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      <header className="mx-auto mb-8 w-full max-w-3xl">
        <nav>
          {/* <Stepper steps={steps} currentStep={currentStep} /> */}
          <Stepper steps={steps} currentStep={step ?? 1} />
        </nav>
      </header>
      <section className="flex flex-col gap-8 md:flex-row md:justify-between">
        <aside className="w-full rounded-lg p-4 md:w-2/3">
          {step === 0 && <Addresses />}
        </aside>

        <aside className="w-full rounded-lg p-4 md:w-1/3">
          <CartSummary />
        </aside>
      </section>
    </main>
  );
};

export { CheckoutPage };
