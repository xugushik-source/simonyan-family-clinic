import { useTranslations, useLocale } from "next-intl";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { contact, address, openingHours } from "@/config/clinic.config";
import type { Locale } from "@/i18n/routing";

export function ContactSection() {
  const t = useTranslations("home.contact");
  const locale = useLocale() as Locale;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem>
            <a
              href={contact.phoneHref}
              className="flex items-center gap-3 rounded-2xl border border-forest-100 bg-white p-5 hover:border-forest-300"
            >
              <Phone className="h-5 w-5 text-forest-700" />
              <span className="text-sm font-semibold text-forest-900">{contact.phoneDisplay}</span>
            </a>
          </RevealItem>
          <RevealItem>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-forest-100 bg-white p-5 hover:border-forest-300"
            >
              <MessageCircle className="h-5 w-5 text-teal-700" />
              <span className="text-sm font-semibold text-forest-900">WhatsApp</span>
            </a>
          </RevealItem>
          <RevealItem className="flex items-center gap-3 rounded-2xl border border-forest-100 bg-white p-5">
            <MapPin className="h-5 w-5 text-sand-700" />
            <span className="text-sm text-ink-700">{address[locale]}</span>
          </RevealItem>
          <RevealItem className="flex items-center gap-3 rounded-2xl border border-forest-100 bg-white p-5">
            <Clock className="h-5 w-5 text-forest-700" />
            <span className="text-sm text-ink-700">{openingHours[locale]}</span>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
