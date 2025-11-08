import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useUserAddressQuery } from "@/src/hooks/queries/useUserAddress";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { formatAddress } from "@/src/helpers/address-summarized";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useCreateOrderMutation } from "@/src/hooks/mutations/useCreateOrderMutation";
import { IOrder } from "@/src/interface/IOrder";
import useCartStore from "@/src/store/cart-store/useCartStore";

const CheckoutConfirmation = () => {
  const {
    userInfo,
    payment,
    prevStep,
    finishOrder,
    nextStep,
    setOrderId,
    setDoneSuccessfully,
  } = useCheckoutStore();
  const { data: addresses, isLoading } = useUserAddressQuery();
  const { cart } = useCartStore();
  const createOrderMutation = useCreateOrderMutation();

  const handleFinishOrder = async () => {
    try {
      const selectedAddress = addresses?.data?.find(
        (address) => address.shippingAddrId === userInfo?.address_id,
      );
      const payload: IOrder = {
        receiverName: selectedAddress?.receiverName || "",
        street: selectedAddress?.street || "",
        number: selectedAddress?.number || "",
        complement: selectedAddress?.complement || "",
        referencePoint: selectedAddress?.referencePoint || "",
        neighborhood: selectedAddress?.neighborhood || "",
        city: selectedAddress?.city || "",
        state: selectedAddress?.state || "",
        country: selectedAddress?.country || "",
        zipCode: selectedAddress?.zipCode || "",
        phoneNumber: selectedAddress?.phoneNumber || "",
        shippingCompany: "TESTE",
        shippingTax: 0,
        discount: 0,
        totalPriceInCents: 0,
        status: "PENDING",
        paymentType: "BANK_SLIP",
        items: cart?.items || [],
      };

      const order = await createOrderMutation.mutateAsync(payload);

      setOrderId(order.data.orderId);
      setDoneSuccessfully(true);

      nextStep();
      finishOrder();
    } catch (error) {
      setDoneSuccessfully(false);
      console.error("Error finishing order:", error);
      toast.error("Order could be not created");
    }
  };

  isLoading && (
    <div className="py-4 text-center">
      <p>Loading...</p>
    </div>
  );

  return (
    <Card className="p-4">
      <CardTitle>Confirmation</CardTitle>
      <Card>
        <CardHeader>Identification</CardHeader>
        <CardContent className="p-4">
          <RadioGroup value={userInfo?.address_id || ""}>
            {addresses?.data &&
              addresses.data.length > 0 &&
              addresses?.data
                .filter(
                  (address) => address.shippingAddrId === userInfo?.address_id,
                )
                .map((address) => (
                  <div
                    className="flex items-start space-x-2"
                    key={address.shippingAddrId}
                  >
                    <RadioGroupItem
                      value={address.shippingAddrId}
                      id={address.shippingAddrId}
                      disabled
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={address.shippingAddrId}
                        className="cursor-pointer"
                      >
                        <div>
                          <p className="text-sm">{formatAddress(address)}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
          </RadioGroup>
        </CardContent>
      </Card>
      <hr className="my-4" />
      <Card>
        <CardHeader>Payment Method</CardHeader>
        <CardContent className="p-4">
          <RadioGroup value={payment?.paymentMethod || ""} className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank_slip" id="bank_slip" disabled />
              <Label htmlFor="bank_slip">Bank Slip</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-4 flex w-full gap-2">
        <Button onClick={prevStep} variant="outline" className="flex-1">
          Back to Identification
        </Button>
        <Button onClick={handleFinishOrder} className="flex-1">
          Finish Order
        </Button>
      </div>
    </Card>
  );
};

export { CheckoutConfirmation };
