"use client";

import { NotepadText } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

import { useTranslation } from "react-i18next";

function OrderButton() {
  const { t } = useTranslation();
  return (
    <Link href={"/orders"}>
      <Button variant="ghost" className="cursor-pointer">
        <NotepadText className="h-5 w-5" />
        <span className="sr-only">{t("buttons.order")}</span>
      </Button>
    </Link>
  );
}
export { OrderButton };
