import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { CTAButton } from "@/components/shared/CTAButton";
import { Reveal } from "@/components/shared/Reveal";

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  const tCommon = useTranslations("common");

  return (
    <section className="bg-forest-800 py-16 text-center sm:py-20">
      <Container>
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-milk sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-sm text-forest-200 sm:text-base">{t("subtitle")}</p>
          <div className="mt-8">
            <CTAButton href="/booking" variant="secondary">
              {tCommon("bookAppointment")}
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
