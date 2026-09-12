import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FileText, Stethoscope, MessageCircle, Baby } from "lucide-react";

const sections = [
  { key: "beforeVisit", icon: FileText },
  { key: "firstVisit", icon: Stethoscope },
  { key: "requestOnly", icon: MessageCircle },
  { key: "children", icon: Baby },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.patients" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/patients" });
}

export default async function PatientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "patients" });
  const tSections = await getTranslations({ locale, namespace: "patients.sections" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("patients"), href: "/patients" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map(({ key, icon: Icon }) => (
          <div key={key} className="rounded-2xl border border-forest-100 bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-serif text-lg font-semibold text-forest-900">
              {tSections(`${key}`)}
            </p>
            <p className="mt-2 text-sm text-ink-500">{tSections(`${key}Text`)}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
