"use client";

import { useTranslation } from "react-i18next";

export function LoadingProducts() {
  const { t } = useTranslation("products");
  return (
    <div className="flex items-center justify-center p-8">
      {t("list.loading")}
    </div>
  );
}
