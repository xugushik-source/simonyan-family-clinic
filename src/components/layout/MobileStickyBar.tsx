"use client";

import { useTranslations } from "next-intl";
import { Phone, MessageCircle, CalendarPlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contact } from "@/config/clinic.config";

export function MobileStickyBar() {
  const t = useTranslations("mobileBar");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-forest-200 bg-milk shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.15)] lg:hidden">
      <a
        href={contact.phoneHref}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold text-forest-800 active:bg-forest-50"
      >
        <Phone className="h-5 w-5" />
        {t("call")}
      </a>
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 border-x border-forest-100 py-2.5 text-xs font-semibold text-teal-700 active:bg-teal-50"
      >
        <MessageCircle className="h-5 w-5" />
        {t("whatsapp")}
      </a>
      <Link
        href="/booking"
        className="flex flex-col items-center justify-center gap-1 bg-forest-700 py-2.5 text-xs font-semibold text-milk active:bg-forest-800"
      >
        <CalendarPlus className="h-5 w-5" />
        {t("book")}
      </Link>
    </div>
  );
}
