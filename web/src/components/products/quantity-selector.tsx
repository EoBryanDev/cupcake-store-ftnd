"use client";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="w-3/7 px-5 md:w-3/9">
      <div className="space-y-4">
        <div className="flex w-full items-center justify-between rounded-lg border">
          <Button size="icon" variant="ghost" onClick={handleDecrement}>
            <MinusIcon />
          </Button>
          <p>{quantity}</p>
          <Button size="icon" variant="ghost" onClick={handleIncrement}>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { QuantitySelector };
