import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import {
  clinicName,
  clinicBrandInternational,
  contact,
  address,
  openingHours,
} from "@/config/clinic.config";
import type { Locale } from "@/i18n/routing";

const navKeys = [
  ["about", "/about"],
  ["departments", "/departments"],
  ["services", "/services"],
  ["doctors", "/doctors"],
  ["diagnostics", "/diagnostics"],
  ["prices", "/prices"],
  ["patients", "/patients"],
  ["articles", "/articles"],
  ["contacts", "/contacts"],
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-forest-100 bg-forest-900 text-forest-50">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg font-semibold">{clinicName[locale]}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-forest-300">
            {clinicBrandInternational}
          </p>
          <p className="mt-3 text-sm text-forest-200">{t("tagline")}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-forest-300">
            {t("navigation")}
          </p>
          <ul className="space-y-2 text-sm">
            {navKeys.map(([key, href]) => (
              <li key={key}>
                <Link href={href} className="text-forest-100 hover:text-white">
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-forest-300">
            {t("contactsTitle")}
          </p>
          <ul className="space-y-2 text-sm text-forest-100">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li className="pt-1 text-forest-300">{address[locale]}</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-forest-300">
            {t("hoursTitle")}
          </p>
          <p className="text-sm text-forest-100">{openingHours[locale]}</p>
        </div>
      </Container>

      <div className="border-t border-forest-800">
        <Container className="flex flex-col gap-3 py-6 text-xs text-forest-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinicName[locale]}. {t("rights")}
          </p>
          <p className="max-w-xl">{t("requestOnlyNotice")}</p>
        </Container>
      </div>
    </footer>
  );
}
