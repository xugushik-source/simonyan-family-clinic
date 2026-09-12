"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Menu, X, Phone } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CTAButton } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { clinicNameShort, contact } from "@/config/clinic.config";
import { useParams } from "next/navigation";
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

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-milk/95 backdrop-blur">
      {/*
        The shared Container caps at max-w-7xl (1280px) everywhere else on
        the site, but that's too narrow for a single-row nav once Georgian
        or Armenian labels (longer than Russian) are in the mix — it was
        overflowing horizontally on real desktop widths. Give the header
        row more breathing room; the rest of the site keeps the narrower
        reading-width container.
      */}
      <Container className="flex h-16 max-w-[100rem] items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-serif text-base font-semibold whitespace-nowrap text-forest-900 sm:text-lg"
        >
          <Image
            src="/logo-icon.png"
            alt={clinicNameShort[locale]}
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
            priority
          />
          <span className="hidden sm:inline">{clinicNameShort[locale]}</span>
        </Link>

        <nav className="hidden items-center gap-4 min-[1700px]:flex">
          {navKeys.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="whitespace-nowrap text-sm font-medium text-ink-700 transition-colors hover:text-forest-700"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 min-[1700px]:flex">
          <LanguageSwitcher />
          <a
            href={contact.phoneHref}
            className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-forest-800"
            aria-label={contact.phoneDisplay}
          >
            <Phone className="h-4 w-4" />
            {contact.phoneDisplay}
          </a>
          <CTAButton href="/booking" variant="primary" className="whitespace-nowrap">
            {tCommon("bookAppointment")}
          </CTAButton>
        </div>

        <div className="flex items-center gap-2 min-[1700px]:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-200 text-forest-800"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-forest-100 bg-milk min-[1700px]:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navKeys.map(([key, href]) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-forest-50"
              >
                {t(key)}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-3">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-1.5 text-sm font-semibold text-forest-800"
              >
                <Phone className="h-4 w-4" />
                {contact.phoneDisplay}
              </a>
              <CTAButton href="/booking" variant="primary" className="w-full">
                {tCommon("bookAppointment")}
              </CTAButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
