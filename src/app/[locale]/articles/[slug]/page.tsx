import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTAButton } from "@/components/shared/CTAButton";
import { formatLocalizedDate } from "@/lib/utils";
import { articles, getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const typedLocale = locale as Locale;
  return buildMetadata({
    locale: typedLocale,
    title: article.title[typedLocale],
    description: article.excerpt[typedLocale],
    path: `/articles/${slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "articles" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const paragraphs = article.content[typedLocale].split("\n\n");

  return (
    <Container className="py-10">
      <JsonLd data={articleSchema(typedLocale, article)} />
      <JsonLd
        data={breadcrumbSchema(typedLocale, [
          { name: tNav("articles"), path: "/articles" },
          { name: article.title[typedLocale], path: `/articles/${slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: tNav("articles"), href: "/articles" },
          { label: article.title[typedLocale], href: `/articles/${slug}` },
        ]}
      />

      <article className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {t("publishedOn")} {formatLocalizedDate(article.publishedAt, typedLocale)} · {article.author[typedLocale]}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">
          {article.title[typedLocale]}
        </h1>
        <div className="prose-clinic mt-6 space-y-4 text-sm leading-relaxed text-ink-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-forest-50 p-6 text-center">
          <p className="text-sm text-forest-800">{t("pageSubtitle")}</p>
          <div className="mt-4">
            <CTAButton href="/booking" variant="primary">
              {tCommon("bookAppointment")}
            </CTAButton>
          </div>
        </div>
      </article>
    </Container>
  );
}
