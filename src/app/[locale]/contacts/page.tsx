import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { Phone, MessageCircle, MapPin, Clock, Share2 } from "lucide-react";
import {
  clinicName,
  contact,
  address,
  openingHours,
  coordinates,
  socials,
} from "@/config/clinic.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.contacts" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/contacts" });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "contacts" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const hasCoordinates = coordinates.lat !== null && coordinates.lng !== null;

  return (
    <Container className="py-10">
      <JsonLd
        data={breadcrumbSchema(typedLocale, [{ name: tNav("contacts"), path: "/contacts" }])}
      />
      <Breadcrumbs items={[{ label: tNav("contacts"), href: "/contacts" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <dl className="space-y-5">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              {t("clinicName")}
            </dt>
            <dd className="mt-1 text-base font-medium text-forest-900">{clinicName[typedLocale]}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
              <MapPin className="h-4 w-4" /> {t("address")}
            </dt>
            <dd className="mt-1 text-sm text-ink-700">{address[typedLocale]}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
              <Phone className="h-4 w-4" /> {t("phone")}
            </dt>
            <dd className="mt-1">
              <a href={contact.phoneHref} className="text-sm font-medium text-forest-900 hover:underline">
                {contact.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
              <MessageCircle className="h-4 w-4" /> {t("whatsapp")}
            </dt>
            <dd className="mt-1">
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-forest-900 hover:underline"
              >
                {contact.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
              <Clock className="h-4 w-4" /> {t("hours")}
            </dt>
            <dd className="mt-1 text-sm text-ink-700">{openingHours[typedLocale]}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
              <Share2 className="h-4 w-4" /> {t("social")}
            </dt>
            {/*
              Always show a slot per platform — links go live the moment a
              real account is confirmed in clinic.config.ts, no layout
              change needed. Unconfirmed ones show as muted with "soon".
            */}
            <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {socials.map((s) =>
                s.href ? (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-forest-900 hover:underline"
                  >
                    {s.name}
                  </a>
                ) : (
                  <span key={s.name} className="text-sm text-ink-300">
                    {s.name} <span className="italic">({t("socialSoon")})</span>
                  </span>
                )
              )}
            </dd>
          </div>
        </dl>

        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-forest-200 bg-forest-50/50 p-8 text-center">
          {hasCoordinates ? (
            <a
              href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-forest-800 hover:underline"
            >
              {t("route")}
            </a>
          ) : (
            <p className="text-sm text-ink-500">{address[typedLocale]}</p>
          )}
        </div>
      </div>
    </Container>
  );
}
