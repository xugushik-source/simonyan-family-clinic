import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { formatLocalizedDate } from "@/lib/utils";
import { articles } from "@/data/articles";
import type { Locale } from "@/i18n/routing";

export function ArticlesPreview() {
  const t = useTranslations("home.articles");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const featured = articles.slice(0, 3);

  return (
    <section className="bg-forest-50/50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t("title")} />
          <CTAButton href="/articles" variant="ghost">
            {tCommon("seeAll")}
          </CTAButton>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {featured.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex min-w-0 flex-col rounded-2xl border border-forest-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                {formatLocalizedDate(article.publishedAt, locale)}
              </p>
              <p className="mt-3 min-w-0 break-words font-serif text-lg font-semibold text-forest-900">
                {article.title[locale]}
              </p>
              <p className="min-w-0 break-words text-sm text-ink-500">{article.excerpt[locale]}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
