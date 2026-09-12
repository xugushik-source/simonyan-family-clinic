import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { formatLocalizedDate } from "@/lib/utils";
import { articles } from "@/data/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.articles" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "/articles" });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "articles" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: tNav("articles"), href: "/articles" }]} />
      <h1 className="font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">{t("pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{t("pageSubtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="flex flex-col rounded-2xl border border-forest-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              {formatLocalizedDate(article.publishedAt, typedLocale)}
            </p>
            <p className="mt-3 font-serif text-lg font-semibold text-forest-900">
              {article.title[typedLocale]}
            </p>
            <p className="mt-2 text-sm text-ink-500">{article.excerpt[typedLocale]}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
