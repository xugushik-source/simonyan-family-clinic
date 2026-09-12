import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { physicianSchema, breadcrumbSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTAButton } from "@/components/shared/CTAButton";
import { DoctorAvatar } from "@/components/shared/DoctorAvatar";
import { JsonLd } from "@/components/shared/JsonLd";
import { Link } from "@/i18n/navigation";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import { getDepartmentBySlug } from "@/data/departments";
import { getServiceBySlug } from "@/data/services";

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return {};
  const typedLocale = locale as Locale;
  return buildMetadata({
    locale: typedLocale,
    title: `${doctor.name[typedLocale]} — ${doctor.position[typedLocale]}`,
    description: doctor.bio[typedLocale],
    path: `/doctors/${slug}`,
  });
}

const languageLabel: Record<string, string> = {
  ru: "Русский",
  ka: "ქართული",
  hy: "Հայերեն",
  en: "English",
};

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const t = await getTranslations({ locale, namespace: "doctors.profile" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const departments = doctor.departmentSlugs.map(getDepartmentBySlug).filter(isDefined);
  const services = doctor.serviceSlugs.map(getServiceBySlug).filter(isDefined);

  return (
    <Container className="py-10">
      <JsonLd data={physicianSchema(typedLocale, doctor)} />
      <JsonLd
        data={breadcrumbSchema(typedLocale, [
          { name: tNav("doctors"), path: "/doctors" },
          { name: doctor.name[typedLocale], path: `/doctors/${slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: tNav("doctors"), href: "/doctors" },
          { label: doctor.name[typedLocale], href: `/doctors/${slug}` },
        ]}
      />

      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <DoctorAvatar name={doctor.name[typedLocale]} size="lg" />
        <div>
          <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">
            {doctor.name[typedLocale]}
          </h1>
          <p className="mt-1 text-base text-ink-500">{doctor.position[typedLocale]}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-700">{doctor.bio[typedLocale]}</p>
          <div className="mt-5">
            <CTAButton href={`/booking?doctor=${doctor.id}`} variant="primary">
              {t("bookWithDoctor")}
            </CTAButton>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-forest-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{t("experience")}</p>
          <p className="mt-1 text-sm font-medium text-forest-900">
            {doctor.experienceYears} {tCommon("years")}
          </p>
        </div>
        <div className="rounded-xl border border-forest-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{t("languages")}</p>
          <p className="mt-1 text-sm font-medium text-forest-900">
            {doctor.languages.map((l) => languageLabel[l] ?? l).join(", ")}
          </p>
        </div>
        <div className="rounded-xl border border-forest-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{tCommon("specialization")}</p>
          <p className="mt-1 text-sm font-medium text-forest-900">
            {doctor.specialties[typedLocale].join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-forest-900">{t("education")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            {doctor.education[typedLocale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-forest-900">{t("training")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            {doctor.training[typedLocale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-forest-900">{t("certificates")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            {doctor.certificates[typedLocale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {departments.length > 0 && (
        <div className="mt-14">
          <h2 className="font-serif text-lg font-semibold text-forest-900">{t("departments")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {departments.map((d) => (
              <Link
                key={d.slug}
                href={`/departments/${d.slug}`}
                className="rounded-full border border-forest-200 px-4 py-1.5 text-sm font-medium text-forest-800 hover:border-forest-400"
              >
                {d.name[typedLocale]}
              </Link>
            ))}
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-forest-900">{t("services")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-forest-200 px-4 py-1.5 text-sm font-medium text-forest-800 hover:border-forest-400"
              >
                {s.name[typedLocale]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
