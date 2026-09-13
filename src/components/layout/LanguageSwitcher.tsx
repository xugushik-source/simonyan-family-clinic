"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const activeLocale = params.locale as Locale;

  return (
    <div
      className={cn(
        "flex items-center gap-0 rounded-full border border-forest-200 bg-white/60 p-0.5 sm:gap-0.5 sm:p-1",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => router.replace(pathname, { locale })}
          className={cn(
            "rounded-full px-1.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors sm:px-2.5 sm:text-xs",
            locale === activeLocale
              ? "bg-forest-700 text-milk"
              : "text-forest-700 hover:bg-forest-50"
          )}
          aria-current={locale === activeLocale ? "true" : undefined}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
