import ruMessages from "@/messages/ru.json";
import kaMessages from "@/messages/ka.json";
import hyMessages from "@/messages/hy.json";
import type { Locale } from "@/i18n/routing";
import { contact } from "@/config/clinic.config";
import { formatLocalizedDate } from "./utils";

const messagesByLocale: Record<Locale, typeof ruMessages> = {
  ru: ruMessages,
  ka: kaMessages,
  hy: hyMessages,
};

export interface BookingWhatsAppInput {
  locale: Locale;
  patientName: string;
  departmentName?: string;
  doctorName?: string;
  /** ISO date, e.g. 2026-09-18 */
  date?: string;
  /** HH:mm */
  time?: string;
  phone: string;
  comment?: string;
}

/**
 * Builds a single-language WhatsApp deep link with a pre-filled booking
 * request message. The message language always matches the locale the
 * patient used on the site — languages are never mixed within one
 * message.
 */
export function buildBookingWhatsAppLink(input: BookingWhatsAppInput): string {
  const t = messagesByLocale[input.locale].whatsapp;
  const lines: string[] = [t.greeting, ""];

  lines.push(`${t.patient}: ${input.patientName}`);
  if (input.departmentName) {
    lines.push(`${t.direction}: ${input.departmentName}`);
  }
  lines.push(`${t.doctor}: ${input.doctorName || t.doctorAny}`);
  if (input.date) {
    lines.push(`${t.date}: ${formatLocalizedDate(input.date, input.locale)}`);
  }
  if (input.time) {
    lines.push(`${t.time}: ${input.time}`);
  }
  lines.push(`${t.phone}: ${input.phone}`);
  if (input.comment) {
    lines.push(`${t.comment}: ${input.comment}`);
  }
  lines.push("");
  lines.push(t.confirmRequest);

  const message = lines.join("\n");
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
