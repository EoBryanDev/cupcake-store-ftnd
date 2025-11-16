import { getUserLocale } from "./get-user-locate";

export const getTimeSeparator = (): string => {
  const locale = getUserLocale();

  if (locale.startsWith("pt")) {
    return "às";
  }

  if (locale.startsWith("es")) {
    return "a las";
  }

  return "at"; // padrão para inglês e outros
};