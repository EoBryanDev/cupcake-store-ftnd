import { getUserLocale } from "./get-user-locate";

export const formatDateTimeToUserLocale = (isoDate: string): string => {
  const locale = getUserLocale();
  const date = new Date(isoDate);

  return date.toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};