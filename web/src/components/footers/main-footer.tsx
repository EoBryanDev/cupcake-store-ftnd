"use client";

import { useTranslation } from "react-i18next";

function MainFooter() {
  const { t } = useTranslation();
  return (
    <div className="bg-accent w-full gap-1 p-8">
      <p className="text-xs font-medium">{t("footer.copyright")}</p>
      <p className="text-muted-foreground text-xs font-medium">
        {t("footer.rights")}
      </p>
    </div>
  );
}

export { MainFooter };
