"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";

const PaymentMethod = () => {
  const { nextStep, addPayment, prevStep, payment } = useCheckoutStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(payment?.paymentMethod || null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={selectedPaymentMethod || ""}
          onValueChange={(value) => {
            setSelectedPaymentMethod(value);
          }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="BANK_SLIP" id="BANK_SLIP" />
            <Label htmlFor="BANK_SLIP" className="cursor-pointer">
              Bank Slip
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CREDIT_CARD" id="CREDIT_CARD" disabled />
            <Label
              htmlFor="CREDIT_CARD"
              className="text-muted-foreground cursor-pointer"
            >
              Credit Card
            </Label>
          </div>
        </RadioGroup>

        <div className="flex w-full flex-col gap-2 pt-2 sm:flex-row">
          <Button
            onClick={prevStep}
            variant="outline"
            className="flex-1 cursor-pointer"
          >
            Back to Identification
          </Button>
          <Button
            onClick={() => {
              addPayment({ paymentMethod: selectedPaymentMethod! });
              nextStep();
            }}
            disabled={!selectedPaymentMethod}
            className="flex-1 cursor-pointer"
          >
            Next to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { PaymentMethod };
