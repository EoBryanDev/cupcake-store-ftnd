"use client";

import { Button } from "@/src/components/ui/button";
import { User } from "lucide-react";

import { useTranslation } from "react-i18next";

function UserButton() {
  const { t } = useTranslation();
  return (
    <Button variant="ghost" className="cursor-pointer">
      {/* <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> */}
      <User className="h-5 w-5" />
      <span className="sr-only">{t("buttons.account")}</span>
    </Button>
  );
}
export { UserButton };
