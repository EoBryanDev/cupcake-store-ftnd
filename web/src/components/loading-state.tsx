"use client";

import { useTranslation } from "react-i18next";

interface LoadingStateProps {
  messageKey?: string;
  ns?: string;
  defaultMessage?: string;
}

export function LoadingState({
  messageKey = "status.loading",
  ns = "common",
  defaultMessage = "Loading..."
}: LoadingStateProps) {
  const { t } = useTranslation(ns as any);
  return (
    <div className="flex items-center justify-center p-8">
      {t(messageKey, defaultMessage)}
    </div>
  );
}
