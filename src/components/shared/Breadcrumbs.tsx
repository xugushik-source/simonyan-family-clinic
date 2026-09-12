import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("breadcrumbs");

  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-forest-700">
            {t("home")}
          </Link>
          {items.length > 0 && <ChevronRight className="h-3.5 w-3.5" />}
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {i < items.length - 1 ? (
              <>
                <Link href={item.href} className="hover:text-forest-700">
                  {item.label}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            ) : (
              <span className="font-medium text-forest-800" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
