import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/routing";
import { currency } from "@/config/clinic.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an amount with the clinic's currency (GEL/₾), handling the
 * "starting from" label correctly per language: Russian prefixes it
 * ("от 100 ₾"), while Georgian and Armenian suffix it directly onto the
 * number ("100 ₾-დან", "100 ₾-ից") — gluing the label on the wrong side
 * reads as broken grammar, not just an odd word order.
 */
export function formatPrice(
  amount: number,
  locale: Locale,
  options?: { priceFrom?: boolean; fromLabel?: string }
): string {
  const value = `${amount} ${currency[locale]}`;
  if (!options?.priceFrom || !options.fromLabel) return value;
  return locale === "ru" ? `${options.fromLabel} ${value}` : `${value}${options.fromLabel}`;
}

// Month names are hardcoded rather than delegated to Intl.DateTimeFormat:
// not every browser/OS ships full ICU data for ka-GE / hy-AM, and when it's
// missing, Intl silently falls back to English instead of throwing — which
// would leak an English date into an otherwise Georgian or Armenian
// WhatsApp message. A fixed table is guaranteed to render correctly
// everywhere and keeps every message in a single language.
const monthNames: Record<string, string[]> = {
  ru: [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ],
  ka: [
    "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
    "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი",
  ],
  hy: [
    "հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի",
    "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի",
  ],
};

export function formatLocalizedDate(isoDate: string, locale: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const day = date.getDate();
  const month = monthNames[locale]?.[date.getMonth()] ?? monthNames.ru[date.getMonth()];
  const year = date.getFullYear();

  if (locale === "ka") return `${day} ${month}, ${year}`;
  if (locale === "hy") return `${day} ${month} ${year} թ.`;
  return `${day} ${month} ${year} г.`;
}
