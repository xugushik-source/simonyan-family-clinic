import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DoctorAvatar } from "@/components/shared/DoctorAvatar";
import { CTAButton } from "@/components/shared/CTAButton";
import { Link } from "@/i18n/navigation";
import { doctors } from "@/data/doctors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.doctors" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/doctors" });
}

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "doctors" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("doctors"), href: "/doctors" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col items-center rounded-2xl border border-forest-100 bg-white p-6 text-center"
          >
            <Link href={`/doctors/${doctor.slug}`} className="flex flex-col items-center">
              <DoctorAvatar name={doctor.name[typedLocale]} size="lg" />
              <p className="mt-4 font-serif text-lg font-semibold text-forest-900">
                {doctor.name[typedLocale]}
              </p>
              <p className="mt-1 text-sm text-ink-500">{doctor.position[typedLocale]}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
                {tCommon("experience")}: {doctor.experienceYears} {tCommon("years")}
              </p>
            </Link>
            <div className="mt-4 flex gap-2">
              <CTAButton href={`/doctors/${doctor.slug}`} variant="ghost" className="text-xs">
                {tCommon("readMore")}
              </CTAButton>
              <CTAButton href={`/booking?doctor=${doctor.id}`} variant="primary" className="text-xs">
                {tCommon("bookAppointment")}
              </CTAButton>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
