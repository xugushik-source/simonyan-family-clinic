import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BookingWizard } from "@/components/booking/BookingWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.booking" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/booking" });
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "booking" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("booking"), href: "/booking" }]} />
      <div className="text-center">
        <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-500">{t("subtitle")}</p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <BookingWizard />
        </Suspense>
      </div>
    </Container>
  );
}
