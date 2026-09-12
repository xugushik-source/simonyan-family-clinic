import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { CTAButton } from "@/components/shared/CTAButton";
import { contact } from "@/config/clinic.config";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest-50 via-milk to-milk py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sand-100/60 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-forest-700/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
            {t("eyebrow")}
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-forest-900 sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href="/booking" variant="primary">
              {t("ctaBook")}
            </CTAButton>
            <CTAButton href="/doctors" variant="secondary">
              {t("ctaDoctor")}
            </CTAButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-forest-800">
            <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-forest-900">
              <Phone className="h-4 w-4" />
              {contact.phoneDisplay}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-forest-900"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
