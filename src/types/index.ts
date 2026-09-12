import type { Locale } from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface FAQItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface Department {
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  whenToVisit: LocalizedList;
  symptoms: LocalizedList;
  serviceSlugs: string[];
  doctorIds: string[];
  diagnosticSlugs: string[];
  faqIds: string[];
  icon: DepartmentIcon;
}

export type DepartmentIcon =
  | "heart"
  | "stethoscope"
  | "baby"
  | "flower"
  | "brain"
  | "activity"
  | "kidney"
  | "ear"
  | "eye"
  | "sparkles"
  | "pill"
  | "scissors"
  | "bone";

export interface Service {
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  recommendedFor: LocalizedList;
  preparation: LocalizedList;
  procedure: LocalizedText;
  durationMinutes: number | null;
  departmentSlugs: string[];
  doctorIds: string[];
  priceId: string;
  faqIds: string[];
}

export interface Diagnostic {
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  departmentSlugs: string[];
  priceId: string | null;
}

export type PriceCategory =
  | "consultation"
  | "diagnostics"
  | "laboratory"
  | "procedure"
  | "program";

export interface PriceItem {
  id: string;
  name: LocalizedText;
  category: PriceCategory;
  departmentSlugs: string[];
  priceFrom: boolean;
  amount: number;
  serviceSlug?: string;
}

export interface DoctorSchedule {
  doctorId: string;
  workingDays: number[]; // 0 = Sunday ... 6 = Saturday
  dayStart: string; // "09:00"
  dayEnd: string; // "18:00"
  appointmentDurationMinutes: number;
  unavailableDates: string[]; // ISO dates, e.g. vacation days
  unavailableSlots: { date: string; time: string }[]; // already booked/blocked
}

export interface Doctor {
  id: string;
  slug: string;
  name: LocalizedText;
  position: LocalizedText;
  specialties: LocalizedList;
  departmentSlugs: string[];
  /** null when not yet confirmed — render as "to be confirmed", never a made-up number. */
  experienceYears: number | null;
  languages: string[]; // e.g. ["ru", "ka", "hy", "en"] — empty when not yet confirmed
  education: LocalizedList;
  training: LocalizedList;
  certificates: LocalizedList;
  serviceSlugs: string[];
  bio: LocalizedText;
  photo: string | null; // path to a real photo once provided; null -> initials avatar
}

export interface Article {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  departmentSlugs: string[];
  publishedAt: string; // ISO date
  author: LocalizedText;
}

export interface Review {
  id: string;
  authorName: string;
  departmentSlug: string | null;
  doctorId: string | null;
  text: LocalizedText;
  date: string;
}

export interface MedicalProgram {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  includes: LocalizedList;
  priceId: string;
}
