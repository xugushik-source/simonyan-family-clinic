import { cn } from "@/lib/utils";

const palette = [
  ["#3b6347", "#f2f6f3"],
  ["#39655d", "#dcebe8"],
  ["#a77c47", "#f6f1e5"],
  ["#4f7d5c", "#e1ebe3"],
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % palette.length;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Real doctor photos are not yet available — this renders a deterministic
 * initials avatar per doctor instead of a stock photo, so nobody mistakes
 * a placeholder image for a real staff photo.
 */
export function DoctorAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [bg, fg] = palette[hashName(name)];
  const sizeClasses = {
    sm: "h-12 w-12 text-sm",
    md: "h-20 w-20 text-xl",
    lg: "h-32 w-32 text-3xl",
  }[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-serif font-semibold",
        sizeClasses,
        className
      )}
      style={{ backgroundColor: bg, color: fg }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
