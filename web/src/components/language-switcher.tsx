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

  if (!mounted) return <div className="h-10 w-[70px]" />;

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  const langCode = (i18n.language?.split("-")[0] || "pt") as "en" | "pt";
  const translationKey = `language.${langCode}` as const;

  return (
    <Select
      value={i18n.language?.includes("pt") ? "pt-BR" : "en"}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-auto min-w-[80px] gap-2 px-3">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{langCode === "en" ? "🇺🇸" : "🇧🇷"}</span>
            <span className="text-xs font-bold uppercase md:hidden">
              {langCode}
            </span>
            <span className="hidden text-sm md:inline">
              {t(translationKey as any)}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <span>🇺🇸</span>
            <span>{t("language.en")}</span>
          </div>
        </SelectItem>
        <SelectItem value="pt-BR">
          <div className="flex items-center gap-2">
            <span>🇧🇷</span>
            <span>{t("language.pt")}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
