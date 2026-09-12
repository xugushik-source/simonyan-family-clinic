import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DepartmentIcon } from "@/components/shared/DepartmentIcon";
import { departments } from "@/data/departments";
import type { Locale } from "@/i18n/routing";

export function DirectionsGrid() {
  const t = useTranslations("home.directions");
  const locale = useLocale() as Locale;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={undefined} title={t("title")} subtitle={t("subtitle")} align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {departments.map((d) => (
            <Link
              key={d.slug}
              href={`/departments/${d.slug}`}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-forest-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-700 group-hover:bg-forest-700 group-hover:text-milk">
                <DepartmentIcon icon={d.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-forest-900">{d.name[locale]}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
