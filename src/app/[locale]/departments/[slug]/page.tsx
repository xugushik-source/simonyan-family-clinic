import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { medicalSpecialtySchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTAButton } from "@/components/shared/CTAButton";
import { DepartmentIcon } from "@/components/shared/DepartmentIcon";
import { JsonLd } from "@/components/shared/JsonLd";
import { Link } from "@/i18n/navigation";
import { departments, getDepartmentBySlug } from "@/data/departments";
import { getDoctorById } from "@/data/doctors";
import { getServiceBySlug } from "@/data/services";
import { getDiagnosticBySlug } from "@/data/diagnostics";
import { getFaqById } from "@/data/faq";
import { getPriceById } from "@/data/prices";
import { formatPrice } from "@/lib/utils";
import { DoctorAvatar } from "@/components/shared/DoctorAvatar";
import { ChevronDown, CheckCircle2 } from "lucide-react";

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) return {};
  const typedLocale = locale as Locale;
  return buildMetadata({
    locale: typedLocale,
    title: `${department.name[typedLocale]} — Simonyan Family Clinic`,
    description: department.shortDescription[typedLocale],
    path: `/departments/${slug}`,
  });
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const department = getDepartmentBySlug(slug);
  if (!department) notFound();

  const t = await getTranslations({ locale, namespace: "departments.page" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const doctors = department.doctorIds.map(getDoctorById).filter(isDefined);
  const services = department.serviceSlugs.map(getServiceBySlug).filter(isDefined);
  const diagnostics = department.diagnosticSlugs.map(getDiagnosticBySlug).filter(isDefined);
  const faqs = department.faqIds.map(getFaqById).filter(isDefined);

  return (
    <Container className="py-10">
      <JsonLd data={medicalSpecialtySchema(typedLocale, department)} />
      <JsonLd
        data={breadcrumbSchema(typedLocale, [
          { name: tNav("departments"), path: "/departments" },
          { name: department.name[typedLocale], path: `/departments/${slug}` },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(typedLocale, faqs)} />}

      <Breadcrumbs
        items={[
          { label: tNav("departments"), href: "/departments" },
          { label: department.name[typedLocale], href: `/departments/${slug}` },
        ]}
      />

      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
          <DepartmentIcon icon={department.icon} className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">
            {department.name[typedLocale]}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">
            {department.description[typedLocale]}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <CTAButton href={`/booking?department=${department.slug}`} variant="primary">
          {tCommon("bookAppointment")}
        </CTAButton>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("whenToVisit")}</h2>
          <ul className="mt-4 space-y-2.5">
            {department.whenToVisit[typedLocale].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("symptoms")}</h2>
          <ul className="mt-4 space-y-2.5">
            {department.symptoms[typedLocale].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {services.length > 0 && (
        <div className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("services")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service) => {
              if (!service) return null;
              const price = getPriceById(service.priceId);
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between rounded-xl border border-forest-100 bg-white p-4 hover:border-forest-300"
                >
                  <span className="text-sm font-medium text-forest-900">{service.name[typedLocale]}</span>
                  {price && (
                    <span className="text-sm font-semibold text-teal-700">
                      {formatPrice(price.amount, typedLocale, {
                        priceFrom: price.priceFrom,
                        fromLabel: tCommon("priceFrom"),
                      })}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {doctors.length > 0 && (
        <div className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("doctors")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {doctors.map((doctor) => {
              if (!doctor) return null;
              return (
                <Link
                  key={doctor.id}
                  href={`/doctors/${doctor.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-forest-100 bg-white p-4 hover:border-forest-300"
                >
                  <DoctorAvatar name={doctor.name[typedLocale]} />
                  <div>
                    <p className="font-semibold text-forest-900">{doctor.name[typedLocale]}</p>
                    <p className="text-sm text-ink-500">{doctor.position[typedLocale]}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {diagnostics.length > 0 && (
        <div className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("diagnostics")}</h2>
          <ul className="mt-4 space-y-2">
            {diagnostics.map((diag) => {
              if (!diag) return null;
              return (
                <li key={diag.slug} className="text-sm text-ink-700">
                  <span className="font-medium text-forest-900">{diag.name[typedLocale]}</span> —{" "}
                  {diag.shortDescription[typedLocale]}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {faqs.length > 0 && (
        <div className="mt-14 max-w-2xl">
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("faq")}</h2>
          <div className="mt-4 divide-y divide-forest-100 rounded-2xl border border-forest-100 bg-white">
            {faqs.map((item) => {
              if (!item) return null;
              return (
                <details key={item.id} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest-900">
                    {item.question[typedLocale]}
                    <ChevronDown className="h-4 w-4 shrink-0 text-forest-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {item.answer[typedLocale]}
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
}
