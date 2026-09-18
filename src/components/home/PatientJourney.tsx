import { useTranslations } from "next-intl";
import { UserSearch, CalendarClock, Send, BadgeCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";

const steps = [
  { icon: UserSearch, key: 1 },
  { icon: CalendarClock, key: 2 },
  { icon: Send, key: 3 },
  { icon: BadgeCheck, key: 4 },
] as const;

export function PatientJourney() {
  const t = useTranslations("home.journey");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} align="center" className="mx-auto" />
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, key }) => (
            <RevealItem key={key} className="relative rounded-2xl border border-forest-100 bg-white p-6">
              <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-forest-700 text-sm font-bold text-milk">
                {key}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-50 text-sand-700">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-serif text-base font-semibold text-forest-900">
                {t(`step${key}Title`)}
              </p>
              <p className="mt-2 text-sm text-ink-500">{t(`step${key}Text`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
