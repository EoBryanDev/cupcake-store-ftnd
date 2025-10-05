"use client";

import { NotepadText } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderButton() {
  return (
    <Button variant="ghost" className="cursor-pointer">
      {/* <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> */}
      <NotepadText className="h-5 w-5" />
      <span className="sr-only">Order button</span>
    </Button>
  );
}
export { OrderButton };
