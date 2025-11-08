import { NavMenu } from "../menus/nav-menu";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MainFooter } from "../footers/main-footer";

const OrderError = () => {
  return (
    <div className="flex h-screen flex-col">
      <NavMenu />
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          {/* <h1 className="mb-4 text-6xl font-bold">{error}</h1> */}
          <h2 className="mb-4 text-2xl font-semibold">
            Order was not created with success
          </h2>
          <p className="text-muted-foreground mb-6">
            Something went wrong! Try again later or contact us!
          </p>

          <CheckCircleIcon size={"5rem"} className="mb-4" />
          <Button asChild>
            <Link href={"/orders"}>Go to my orders</Link>
          </Button>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export { OrderError };
