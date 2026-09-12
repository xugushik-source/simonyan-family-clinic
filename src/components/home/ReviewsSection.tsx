import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { reviews } from "@/data/reviews";
import type { Locale } from "@/i18n/routing";

export function ReviewsSection() {
  const t = useTranslations("home.reviews");
  const locale = useLocale() as Locale;

  return (
    <section className="bg-forest-50/50 py-16 sm:py-20">
      <Container>
        <SectionHeading title={t("title")} align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="rounded-2xl border border-forest-100 bg-white p-6 text-sm leading-relaxed text-ink-700"
            >
              <p>&ldquo;{review.text[locale]}&rdquo;</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal-600">
                {review.authorName}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
