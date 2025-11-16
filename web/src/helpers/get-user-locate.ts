export const getUserLocale = (): string => {
  if (typeof window === "undefined") {
    return "en-US";
  }

  const locale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;

  return locale || "en-US";
};