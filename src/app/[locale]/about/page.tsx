import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";

const valueKeys = ["trust", "family", "professionalism", "care", "modernMedicine", "calm"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.about" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("about"), href: "/about" }]} />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-500">{t("intro")}</p>
      </div>

      <div className="mt-16">
        <SectionHeading title={t("valuesTitle")} align="center" className="mx-auto" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueKeys.map((key) => (
            <div key={key} className="rounded-2xl border border-forest-100 bg-white p-6">
              <p className="font-serif text-lg font-semibold text-forest-900">
                {t(`values.${key}.title`)}
              </p>
              <p className="mt-2 text-sm text-ink-500">{t(`values.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
