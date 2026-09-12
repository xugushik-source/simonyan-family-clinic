import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest-700 text-milk hover:bg-forest-800 shadow-soft",
  secondary:
    "bg-sand-100 text-forest-800 hover:bg-sand-200 border border-sand-300",
  ghost: "bg-transparent text-forest-800 hover:bg-forest-50 border border-forest-200",
};

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function CTAButton({
  href,
  variant = "primary",
  className,
  children,
  external,
}: BaseProps & { href: string; external?: boolean }) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    variantClasses[variant],
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
