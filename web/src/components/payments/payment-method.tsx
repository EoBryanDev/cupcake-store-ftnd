"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";

const PaymentMethod = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const { nextStep, addPayment, prevStep } = useCheckoutStore();

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
            <RadioGroupItem value="bank_slip" id="bank_slip" />
            <Label htmlFor="bank_slip">Bank Slip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit_card" id="credit_card" disabled />
            <Label htmlFor="credit_card">Credit Card</Label>
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
