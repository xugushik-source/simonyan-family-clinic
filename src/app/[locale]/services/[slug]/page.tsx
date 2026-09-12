import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { medicalProcedureSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTAButton } from "@/components/shared/CTAButton";
import { JsonLd } from "@/components/shared/JsonLd";
import { DoctorAvatar } from "@/components/shared/DoctorAvatar";
import { Link } from "@/i18n/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { getDoctorById } from "@/data/doctors";
import { getFaqById } from "@/data/faq";
import { getPriceById } from "@/data/prices";
import { ChevronDown, CheckCircle2 } from "lucide-react";

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const typedLocale = locale as Locale;
  return buildMetadata({
    locale: typedLocale,
    title: `${service.name[typedLocale]} — Simonyan Family Clinic`,
    description: service.shortDescription[typedLocale],
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services.page" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const doctors = service.doctorIds.map(getDoctorById).filter(isDefined);
  const faqs = service.faqIds.map(getFaqById).filter(isDefined);
  const price = getPriceById(service.priceId);

  return (
    <Container className="py-10">
      <JsonLd data={medicalProcedureSchema(typedLocale, service)} />
      <JsonLd
        data={breadcrumbSchema(typedLocale, [
          { name: tNav("services"), path: "/services" },
          { name: service.name[typedLocale], path: `/services/${slug}` },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(typedLocale, faqs)} />}

      <Breadcrumbs
        items={[
          { label: tNav("services"), href: "/services" },
          { label: service.name[typedLocale], href: `/services/${slug}` },
        ]}
      />

      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">
        {service.name[typedLocale]}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">
        {service.description[typedLocale]}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <CTAButton href={`/booking?service=${service.slug}`} variant="primary">
          {tCommon("bookAppointment")}
        </CTAButton>
        {price && (
          <span className="text-sm font-semibold text-teal-700">
            {t("price")}: {price.priceFrom ? `${tCommon("priceFrom")} ` : ""}
            {price.amount} ₾
          </span>
        )}
        {service.durationMinutes && (
          <span className="text-sm text-ink-500">
            {t("duration")}: {service.durationMinutes} {tCommon("minutes")}
          </span>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("recommendedFor")}</h2>
          <ul className="mt-4 space-y-2.5">
            {service.recommendedFor[typedLocale].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("preparation")}</h2>
          <ul className="mt-4 space-y-2.5">
            {service.preparation[typedLocale].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 max-w-2xl">
        <h2 className="font-serif text-xl font-semibold text-forest-900">{t("procedure")}</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-700">{service.procedure[typedLocale]}</p>
      </div>

      {doctors.length > 0 && (
        <div className="mt-14">
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("doctors")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {doctors.map((doctor) => (
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
            ))}
          </div>
        </div>
      )}

      {faqs.length > 0 && (
        <div className="mt-14 max-w-2xl">
          <h2 className="font-serif text-xl font-semibold text-forest-900">{t("faq")}</h2>
          <div className="mt-4 divide-y divide-forest-100 rounded-2xl border border-forest-100 bg-white">
            {faqs.map((item) => (
              <details key={item.id} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest-900">
                  {item.question[typedLocale]}
                  <ChevronDown className="h-4 w-4 shrink-0 text-forest-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.answer[typedLocale]}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
