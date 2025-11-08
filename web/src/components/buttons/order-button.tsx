"use client";

import { NotepadText } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function OrderButton() {
  return (
    <Link href={"/orders"}>
      <Button variant="ghost" className="cursor-pointer">
        <NotepadText className="h-5 w-5" />
        <span className="sr-only">Order button</span>
      </Button>
    </Link>
  );
}
export { OrderButton };
