"use client";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";
import { Step, Stepper } from "../steppers/stepper";
import useCartStore from "@/src/store/cart-store/useCartStore";
import { notFound } from "next/navigation";
import CartSummary from "../carts/cart-summary";
import Addresses from "../adresses/address";
import { PaymentMethod } from "../payments/payment-method";
import { CheckoutConfirmation } from "../confirmations/checkout-confirmation";
import { OrderSuccess } from "../orders/order-success";
import { OrderError } from "../orders/order-error";

const CheckoutPage = () => {
  const { step, doneSuccessfully } = useCheckoutStore();
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

  if (!cart?.items && step !== 3) {
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
        {step === 0 && (
          <main className="w-full rounded-lg p-4 md:w-2/3">
            <Addresses />
          </main>
        )}

        {step === 1 && (
          <main className="w-full rounded-lg p-4 md:w-2/3">
            <PaymentMethod />
          </main>
        )}

        {step === 2 && (
          <main className="w-full rounded-lg p-4 md:w-2/3">
            <CheckoutConfirmation />
          </main>
        )}

        {step && step < 3 && (
          <aside className="w-full rounded-lg p-4 md:w-1/3">
            <CartSummary />
          </aside>
        )}

        {(step === 3 && doneSuccessfully && (
          <main className="w-full rounded-lg p-4 md:w-1/3">
            <OrderSuccess />
          </main>
        )) ||
          (step === 3 && !doneSuccessfully && (
            <main className="w-full rounded-lg p-4 md:w-1/3">
              <OrderError />
            </main>
          ))}
      </section>
    </main>
  );
};

export { CheckoutPage };
