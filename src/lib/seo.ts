import type { Metadata } from "next";
import { locales, localeHtmlLang, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/config/clinic.config";

interface BuildMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  /** Path without locale prefix, e.g. "/doctors/tamar-beridze". Use "" for home. */
  path: string;
}

/**
 * Builds Next.js Metadata with canonical + hreflang alternates across
 * all locales for the same logical page, per task requirement #18/#19.
 */
export function buildMetadata({ locale, title, description, path }: BuildMetadataInput): Metadata {
  const cleanPath = path === "/" ? "" : path;
  const canonical = `${siteUrl}/${locale}${cleanPath}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHtmlLang[l]] = `${siteUrl}/${l}${cleanPath}`;
  }
  languages["x-default"] = `${siteUrl}/${locales[0]}${cleanPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Simonyan Family Clinic",
      locale: localeHtmlLang[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
