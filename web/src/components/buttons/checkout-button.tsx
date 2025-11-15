"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface ICheckoutButtonProps {
  disabled: boolean;
  noLoginMsg: string;
  link: string;
}
const CheckoutButton = ({
  disabled,
  noLoginMsg,
  link,
}: ICheckoutButtonProps) => {
  return (
    <div>
      {disabled && <p className="text-primary text-sm italic">{noLoginMsg}</p>}
      <Button
        className="bg-primary w-full rounded-full text-white md:rounded-md"
        size="lg"
        disabled={disabled}
        variant={disabled ? "outline" : "default"}
      >
        <Link href={link} className="cursor-pointer text-sm">
          Checkout
        </Link>
      </Button>
    </div>
  );
};
export default CheckoutButton;
