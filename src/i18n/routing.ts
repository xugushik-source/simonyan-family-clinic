import { defineRouting } from "next-intl/routing";

// Russian is the primary language; Georgian and Armenian are full
// first-class translations. The array order also drives the
// RU | KA | HY switcher in the header.
export const locales = ["ru", "ka", "hy"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  ka: "KA",
  hy: "HY",
};

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  ka: "ქართული",
  hy: "Հայերեն",
};

// BCP-47 tags used for hreflang / html lang attributes.
export const localeHtmlLang: Record<Locale, string> = {
  ru: "ru",
  ka: "ka",
  hy: "hy",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
