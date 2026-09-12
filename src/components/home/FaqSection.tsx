import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { faqItems } from "@/data/faq";
import type { Locale } from "@/i18n/routing";

export function FaqSection({ ids }: { ids?: string[] }) {
  const t = useTranslations("home.faq");
  const locale = useLocale() as Locale;
  const items = ids ? faqItems.filter((f) => ids.includes(f.id)) : faqItems;

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading title={t("title")} align="center" className="mx-auto" />
        <div className="mt-10 divide-y divide-forest-100 rounded-2xl border border-forest-100 bg-white">
          {items.map((item) => (
            <details key={item.id} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest-900">
                {item.question[locale]}
                <ChevronDown className="h-4 w-4 shrink-0 text-forest-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.answer[locale]}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
