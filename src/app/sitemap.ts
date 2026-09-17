import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/clinic.config";
import { locales, localeHtmlLang } from "@/i18n/routing";
import { departments } from "@/data/departments";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "/about",
  "/departments",
  "/services",
  "/doctors",
  "/diagnostics",
  "/prices",
  "/patients",
  "/articles",
  "/contacts",
  "/booking",
];

const dynamicPaths = [
  ...departments.map((d) => `/departments/${d.slug}`),
  ...services.map((s) => `/services/${s.slug}`),
  ...doctors.map((d) => `/doctors/${d.slug}`),
  ...articles.map((a) => `/articles/${a.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allPaths = [...staticPaths, ...dynamicPaths];

  return allPaths.map((path) => {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[localeHtmlLang[l]] = `${siteUrl}/${l}${path}`;
    }

    return {
      url: `${siteUrl}/${locales[0]}${path}`,
      alternates: { languages },
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    };
  });
}
