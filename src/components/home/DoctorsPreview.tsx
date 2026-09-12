import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DoctorAvatar } from "@/components/shared/DoctorAvatar";
import { CTAButton } from "@/components/shared/CTAButton";
import { doctors } from "@/data/doctors";
import type { Locale } from "@/i18n/routing";

export function DoctorsPreview() {
  const t = useTranslations("home.doctors");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const featured = doctors.slice(0, 4);

  return (
    <section className="bg-forest-50/50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          <CTAButton href="/doctors" variant="ghost">
            {tCommon("seeAll")}
          </CTAButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.slug}`}
              className="flex min-w-0 flex-col items-center rounded-2xl border border-forest-100 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <DoctorAvatar name={doctor.name[locale]} size="lg" />
              <p className="mt-4 w-full break-words font-serif text-lg font-semibold text-forest-900">
                {doctor.name[locale]}
              </p>
              <p className="w-full break-words text-sm text-ink-500">{doctor.position[locale]}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-600">
                {tCommon("experience")}: {doctor.experienceYears} {tCommon("years")}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
