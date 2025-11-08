"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
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
      <CardHeader>Payment Method</CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedPaymentMethod || ""}
          onValueChange={(value) => {
            setSelectedPaymentMethod(value);
            // setIsEditing(false);
          }}
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="BANK_SLIP" id="BANK_SLIP" />
            <Label htmlFor="BANK_SLIP">Bank Slip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CREDIT_CARD" id="CREDIT_CARD" disabled />
            <Label htmlFor="CREDIT_CARD">Credit Card</Label>
          </div>
        </RadioGroup>

        <div className="mt-4 flex w-full gap-2">
          <Button onClick={prevStep} variant="outline" className="flex-1">
            Back to Identification
          </Button>
          <Button
            onClick={() => {
              addPayment({ paymentMethod: selectedPaymentMethod! });
              nextStep();
            }}
            disabled={!selectedPaymentMethod}
            className="flex-1"
          >
            Next to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { PaymentMethod };
