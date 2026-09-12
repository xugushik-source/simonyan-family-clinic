import {
  Heart,
  Stethoscope,
  Baby,
  Flower2,
  Brain,
  Activity,
  Droplet,
  Ear,
  Eye,
  Sparkles,
  Pill,
  Scissors,
  Bone,
  type LucideIcon,
} from "lucide-react";
import type { DepartmentIcon as DepartmentIconType } from "@/types";

const iconMap: Record<DepartmentIconType, LucideIcon> = {
  heart: Heart,
  stethoscope: Stethoscope,
  baby: Baby,
  flower: Flower2,
  brain: Brain,
  activity: Activity,
  kidney: Droplet,
  ear: Ear,
  eye: Eye,
  sparkles: Sparkles,
  pill: Pill,
  scissors: Scissors,
  bone: Bone,
};

export function DepartmentIcon({
  icon,
  className,
}: {
  icon: DepartmentIconType;
  className?: string;
}) {
  const Icon = iconMap[icon];
  return <Icon className={className} strokeWidth={1.75} />;
}
