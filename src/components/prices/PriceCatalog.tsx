"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";
import { prices } from "@/data/prices";
import { CTAButton } from "@/components/shared/CTAButton";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { PriceCategory } from "@/types";

const categories: PriceCategory[] = ["consultation", "diagnostics", "laboratory", "procedure", "program"];

export function PriceCatalog() {
  const t = useTranslations("prices");
  const tCommon = useTranslations("common");
  const params = useParams();
  const locale = params.locale as Locale;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PriceCategory | "all">("all");

  const filtered = useMemo(() => {
    return prices.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery = p.name[locale].toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query, locale]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-forest-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-forest-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
            category === "all"
              ? "border-forest-700 bg-forest-700 text-milk"
              : "border-forest-200 text-forest-800 hover:border-forest-400"
          )}
        >
          {tCommon("allCategories")}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
              category === c
                ? "border-forest-700 bg-forest-700 text-milk"
                : "border-forest-200 text-forest-800 hover:border-forest-400"
            )}
          >
            {t(`categories.${c}`)}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-forest-100 bg-white">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-500">{t("noResults")}</p>
        ) : (
          <ul className="divide-y divide-forest-100">
            {filtered.map((price) => (
              <li key={price.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div>
                  <p className="text-sm font-medium text-forest-900">{price.name[locale]}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-ink-300">
                    {t(`categories.${price.category}`)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-sm font-semibold text-teal-700">
                    {price.priceFrom ? `${tCommon("priceFrom")} ` : ""}
                    {price.amount} ₾
                  </span>
                  <CTAButton
                    href={price.serviceSlug ? `/services/${price.serviceSlug}` : "/booking"}
                    variant="ghost"
                    className="hidden text-xs sm:inline-flex"
                  >
                    {tCommon("bookAppointment")}
                  </CTAButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
