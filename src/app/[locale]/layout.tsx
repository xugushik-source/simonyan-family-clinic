import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Playfair_Display, Noto_Sans_Georgian, Noto_Sans_Armenian } from "next/font/google";
import { routing, locales, localeHtmlLang, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair", display: "swap" });
const notoGeorgian = Noto_Sans_Georgian({ subsets: ["georgian"], variable: "--font-georgian", display: "swap" });
const notoArmenian = Noto_Sans_Armenian({ subsets: ["armenian"], variable: "--font-armenian", display: "swap" });

const fontVarsByLocale: Record<Locale, string> = {
  ru: `${inter.variable} ${playfair.variable}`,
  ka: `${notoGeorgian.variable} ${notoGeorgian.variable}`,
  hy: `${notoArmenian.variable} ${notoArmenian.variable}`,
};

const fontClassByLocale: Record<Locale, string> = {
  ru: "font-sans",
  ka: "font-georgian",
  hy: "font-armenian",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "seo" });

  return buildMetadata({
    locale: locale as Locale,
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    path: "",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const typedLocale = locale as Locale;

  return (
    <html lang={localeHtmlLang[typedLocale]} className={fontVarsByLocale[typedLocale]}>
      <body className={`${fontClassByLocale[typedLocale]} bg-milk text-ink-900 antialiased`}>
        <NextIntlClientProvider>
          <JsonLd data={organizationSchema(typedLocale)} />
          <Header />
          <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
          <Footer locale={typedLocale} />
          <MobileStickyBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
