"use client";

import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[140px] h-10" />
    );
  }

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={t("language.select")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">🇺🇸 {t("language.en")}</SelectItem>
        <SelectItem value="pt-BR">🇧🇷 {t("language.pt")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
