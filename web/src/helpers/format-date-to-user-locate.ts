import { getUserLocale } from "./get-user-locate";

export const formatDateToUserLocale = (
  isoDate: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const locale = getUserLocale();
  const date = new Date(isoDate);

  return date.toLocaleDateString(locale, options);
};