import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { DirectionsGrid } from "@/components/home/DirectionsGrid";
import { DoctorsPreview } from "@/components/home/DoctorsPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { DiagnosticsPreview } from "@/components/home/DiagnosticsPreview";
import { PatientJourney } from "@/components/home/PatientJourney";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ArticlesPreview } from "@/components/home/ArticlesPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.home" });
  return buildMetadata({ locale: locale as Locale, title: t("title"), description: t("description"), path: "" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <DirectionsGrid />
      <DoctorsPreview />
      <WhyUs />
      <DiagnosticsPreview />
      <PatientJourney />
      <ReviewsSection />
      <FaqSection />
      <ArticlesPreview />
      <ContactSection />
      <FinalCta />
    </>
  );
}
