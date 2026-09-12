import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import { getPriceById } from "@/data/prices";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.services" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/services" });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "services" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("services"), href: "/services" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const price = getPriceById(service.priceId);
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="flex flex-col rounded-2xl border border-forest-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <p className="font-serif text-lg font-semibold text-forest-900">{service.name[typedLocale]}</p>
              <p className="mt-2 flex-1 text-sm text-ink-500">{service.shortDescription[typedLocale]}</p>
              {price && (
                <p className="mt-4 text-sm font-semibold text-teal-700">
                  {price.priceFrom ? `${tCommon("priceFrom")} ` : ""}
                  {price.amount} ₾
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
