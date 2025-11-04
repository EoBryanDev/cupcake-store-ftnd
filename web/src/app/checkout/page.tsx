import { MainContainer } from "@/src/components/containers/main-container";
import { MainFooter } from "@/src/components/footers/main-footer";
import { CheckoutMenu } from "@/src/components/menus/checkout-menu";
import { CheckoutPage } from "@/src/components/pages/checkout-page";

const Checkout = () => {
  return (
    <main className="flex h-screen flex-col">
      <CheckoutMenu />
      <main className="w-full flex-1 p-8">
        <MainContainer>
          <CheckoutPage />
        </MainContainer>
      </main>
      <MainFooter />
    </main>
  );
};

export default Checkout;
