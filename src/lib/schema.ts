import type { Doctor, Department, Service, Article, FAQItem } from "@/types";
import type { Locale } from "@/i18n/routing";
import { clinicName, contact, siteUrl } from "@/config/clinic.config";

/**
 * JSON-LD builders. Every field here comes from data we actually have
 * (config/data files) — nothing is invented. Address/coordinates are
 * intentionally omitted from schema until they are confirmed, rather
 * than emitting placeholder text as if it were real structured data.
 */

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    name: clinicName[locale],
    alternateName: "Simonyan Family Clinic",
    url: `${siteUrl}/${locale}`,
    telephone: contact.phoneHref.replace("tel:", ""),
    medicalSpecialty: "MedicalClinic",
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };
}

export function physicianSchema(locale: Locale, doctor: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name[locale],
    jobTitle: doctor.position[locale],
    medicalSpecialty: doctor.specialties[locale],
    url: `${siteUrl}/${locale}/doctors/${doctor.slug}`,
    knowsLanguage: doctor.languages,
  };
}

export function medicalSpecialtySchema(locale: Locale, department: Department) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    name: department.name[locale],
    description: department.shortDescription[locale],
    url: `${siteUrl}/${locale}/departments/${department.slug}`,
  };
}

export function medicalProcedureSchema(locale: Locale, service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name[locale],
    description: service.shortDescription[locale],
    url: `${siteUrl}/${locale}/services/${service.slug}`,
  };
}

export function faqPageSchema(locale: Locale, items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale],
      },
    })),
  };
}

export function articleSchema(locale: Locale, article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.excerpt[locale],
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author[locale],
    },
    url: `${siteUrl}/${locale}/articles/${article.slug}`,
  };
}
