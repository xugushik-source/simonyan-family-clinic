import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { diagnostics } from "@/data/diagnostics";
import type { Locale } from "@/i18n/routing";

export function DiagnosticsPreview() {
  const t = useTranslations("home.diagnostics");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const featured = diagnostics.slice(0, 6);

  return (
    <section className="bg-forest-50/50 py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          <CTAButton href="/diagnostics" variant="ghost">
            {tCommon("seeAll")}
          </CTAButton>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <RevealItem key={d.slug}>
              <Link
                href="/diagnostics"
                className="min-w-0 rounded-2xl border border-forest-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <p className="break-words font-serif text-base font-semibold text-forest-900">{d.name[locale]}</p>
                <p className="mt-2 text-sm text-ink-500">{d.shortDescription[locale]}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
