import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { CTAButton } from "@/components/shared/CTAButton";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-forest-200">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-forest-900">{t("notFound")}</h1>
      <p className="mt-2 max-w-md text-sm text-ink-500">{t("notFoundText")}</p>
      <div className="mt-8">
        <CTAButton href="/" variant="primary">
          {t("backHome")}
        </CTAButton>
      </div>
    </Container>
  );
}
