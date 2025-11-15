import { CheckCircleIcon, CircleXIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const OrderError = () => {
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-2xl font-semibold">
            Order was not created with success
          </h2>
          <p className="text-muted-foreground mb-6">
            Something went wrong! Try again later or contact us!
          </p>

          <CircleXIcon size={"5rem"} className="mb-4" />
          <Button asChild>
            <Link href={"/orders"}>Go to my orders</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export { OrderError };
