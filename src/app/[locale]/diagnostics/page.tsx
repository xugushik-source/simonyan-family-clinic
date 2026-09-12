import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTAButton } from "@/components/shared/CTAButton";
import { diagnostics } from "@/data/diagnostics";
import { getPriceById } from "@/data/prices";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.diagnostics" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/diagnostics" });
}

export default async function DiagnosticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "diagnostics" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("diagnostics"), href: "/diagnostics" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {diagnostics.map((d) => {
          const price = d.priceId ? getPriceById(d.priceId) : undefined;
          return (
            <div key={d.slug} className="rounded-2xl border border-forest-100 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="font-serif text-lg font-semibold text-forest-900">{d.name[typedLocale]}</p>
                {price && (
                  <span className="shrink-0 text-sm font-semibold text-teal-700">
                    {price.priceFrom ? `${tCommon("priceFrom")} ` : ""}
                    {price.amount} ₾
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-500">{d.description[typedLocale]}</p>
              <div className="mt-4">
                <CTAButton href="/booking" variant="ghost" className="text-xs">
                  {tCommon("bookAppointment")}
                </CTAButton>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
