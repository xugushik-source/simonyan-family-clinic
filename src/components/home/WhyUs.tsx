import { useTranslations } from "next-intl";
import { Heart, Users, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const points = [
  { icon: Heart, key: "care" },
  { icon: Users, key: "family" },
  { icon: Clock, key: "convenience" },
  { icon: ShieldCheck, key: "trust" },
];

/**
 * Copy here is intentionally about working principles, not statistics
 * or awards — task requirement #11 forbids inventing numbers/awards
 * before real clinic data is available.
 */
export function WhyUs() {
  const t = useTranslations("home.whyUs");
  const tPoints = useTranslations("home.whyUs.points");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="rounded-2xl border border-forest-100 bg-white p-6 text-center"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-serif text-base font-semibold text-forest-900">
                {tPoints(`${key}.title`)}
              </p>
              <p className="mt-2 text-sm text-ink-500">{tPoints(`${key}.text`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
