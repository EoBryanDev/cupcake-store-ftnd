import { getUserLocale } from "./get-user-locate";

export const formatTimeToUserLocale = (
  isoDate: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const locale = getUserLocale();
  const date = new Date(isoDate);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return date.toLocaleTimeString(locale, defaultOptions);
};