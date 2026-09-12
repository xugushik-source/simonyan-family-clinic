import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DepartmentIcon } from "@/components/shared/DepartmentIcon";
import { Link } from "@/i18n/navigation";
import { departments } from "@/data/departments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.departments" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/departments" });
}

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "departments" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("departments"), href: "/departments" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>
      <p className="mt-1 text-xs font-semibold text-sand-700">{tCommon("demoNotice")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <Link
            key={d.slug}
            href={`/departments/${d.slug}`}
            className="flex flex-col rounded-2xl border border-forest-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
              <DepartmentIcon icon={d.icon} className="h-5 w-5" />
            </span>
            <p className="mt-4 font-serif text-lg font-semibold text-forest-900">{d.name[typedLocale]}</p>
            <p className="mt-2 text-sm text-ink-500">{d.shortDescription[typedLocale]}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
