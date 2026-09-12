import type { Locale } from "@/i18n/routing";

/**
 * Single source of truth for clinic identity, contacts, brand and
 * booking configuration. Every component must read from here instead
 * of hardcoding phone numbers, colors, or names.
 *
 * Fields marked PLACEHOLDER are not confirmed real-world data yet
 * (see task requirement: never invent address/stats/awards). Replace
 * them with verified clinic data before launch.
 */

export const clinicName: Record<Locale, string> = {
  ru: "Семейная клиника Симонян",
  ka: "სიმონიანის საოჯახო კლინიკა",
  hy: "Սիմոնյանի ընտանեկան կլինիկա",
};

export const clinicNameShort: Record<Locale, string> = {
  ru: "Клиника Симонян",
  ka: "კლინიკა სიმონიანი",
  hy: "Սիմոնյան կլինիկա",
};

export const clinicBrandInternational = "Simonyan Family Clinic";

// Matches the tagline on the clinic's real logo.
export const clinicTagline: Record<Locale, string> = {
  ru: "Здоровье вашей семьи — наша забота",
  ka: "თქვენი ოჯახის ჯანმრთელობა — ჩვენი ზრუნვაა",
  hy: "Ձեր ընտանիքի առողջությունը մեր հոգածությունն է",
};

export const contact = {
  // Real, confirmed contact channel.
  phoneDisplay: "+995 571 02 20 00",
  phoneHref: "tel:+995571022000",
  whatsappNumber: "995571022000", // digits only, for wa.me links
  whatsappHref: "https://wa.me/995571022000",
};

/** PLACEHOLDER — replace with the clinic's real, confirmed address. */
export const address: Record<Locale, string> = {
  ru: "Адрес уточняется",
  ka: "მისამართი დაზუსტდება",
  hy: "Հասցեն ճշտվում է",
};

/** PLACEHOLDER — replace with real coordinates once the address is confirmed. */
export const coordinates = {
  lat: null as number | null,
  lng: null as number | null,
};

/** PLACEHOLDER — replace with the clinic's real working hours. */
export const openingHours: Record<Locale, string> = {
  ru: "Режим работы уточняется",
  ka: "სამუშაო საათები დაზუსტდება",
  hy: "Աշխատանքային ժամերը ճշտվում են",
};

/** PLACEHOLDER — fill in once social accounts are confirmed. */
export const socials: { name: string; href: string | null }[] = [
  { name: "Facebook", href: null },
  { name: "Instagram", href: null },
];

export const brandColors = {
  forest: "#3b6347",
  teal: "#4a8177",
  sand: "#bd9457",
  milk: "#fbfaf7",
};

export const currency: Record<Locale, string> = {
  ru: "₾",
  ka: "₾",
  hy: "₾",
};

export const bookingConfig = {
  appointmentDurationMinutes: 30,
  advanceBookingDays: 30,
  // The site never claims a confirmed appointment: every submission is a
  // request the clinic confirms manually over WhatsApp.
  isRequestOnly: true,
};

export const siteUrl = "https://simonyanclinic.ge"; // PLACEHOLDER domain
