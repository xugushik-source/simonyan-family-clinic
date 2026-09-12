"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { departments } from "@/data/departments";
import { doctors, getDoctorById } from "@/data/doctors";
import { getAvailableSlots } from "@/data/schedules";
import { buildBookingWhatsAppLink } from "@/lib/whatsapp";
import { formatLocalizedDate, cn } from "@/lib/utils";
import { bookingConfig } from "@/config/clinic.config";
import type { Locale } from "@/i18n/routing";

const STEP_COUNT = 6;

const patientSchema = z.object({
  fullName: z.string().trim().min(4),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{6,20}$/),
  comment: z.string().trim().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

function getNextDays(count: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export function BookingWizard({
  initialDepartmentSlug,
  initialDoctorId,
}: {
  initialDepartmentSlug?: string;
  initialDoctorId?: string;
}) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const params = useParams();
  const locale = params.locale as Locale;

  const [step, setStep] = useState(0);
  const [departmentSlug, setDepartmentSlug] = useState<string | undefined>(initialDepartmentSlug);
  const [doctorId, setDoctorId] = useState<string | undefined>(initialDoctorId);
  const [date, setDate] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: { fullName: "", phone: "", comment: "" },
  });

  const availableDoctors = useMemo(
    () => doctors.filter((d) => !departmentSlug || d.departmentSlugs.includes(departmentSlug)),
    [departmentSlug]
  );

  const days = useMemo(() => getNextDays(bookingConfig.advanceBookingDays), []);

  // When the patient picks "any doctor", fall back to the first doctor in
  // the department to compute representative availability — there is no
  // real department-wide calendar yet, only per-doctor demo schedules.
  const slotSourceDoctorId = doctorId ?? availableDoctors[0]?.id;

  const availableTimes = useMemo(() => {
    if (!slotSourceDoctorId || !date) return [];
    return getAvailableSlots(slotSourceDoctorId, date);
  }, [slotSourceDoctorId, date]);

  const department = departments.find((d) => d.slug === departmentSlug);
  const doctor = doctorId ? getDoctorById(doctorId) : undefined;

  const steps = [
    t("steps.department"),
    t("steps.doctor"),
    t("steps.date"),
    t("steps.time"),
    t("steps.patient"),
    t("steps.review"),
  ];

  function canGoNext(): boolean {
    if (step === 0) return Boolean(departmentSlug);
    if (step === 1) return true; // "any doctor" allowed
    if (step === 2) return Boolean(date);
    if (step === 3) return Boolean(time);
    return true;
  }

  function goNext() {
    if (step < STEP_COUNT - 1) setStep(step + 1);
  }
  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  function onFinalSubmit(values: PatientFormValues) {
    const link = buildBookingWhatsAppLink({
      locale,
      patientName: values.fullName,
      departmentName: department?.name[locale],
      doctorName: doctor?.name[locale],
      date,
      time,
      phone: values.phone,
      comment: values.comment,
    });
    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    const values = getValues();
    const link = buildBookingWhatsAppLink({
      locale,
      patientName: values.fullName,
      departmentName: department?.name[locale],
      doctorName: doctor?.name[locale],
      date,
      time,
      phone: values.phone,
      comment: values.comment,
    });
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-forest-100 bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-12 w-12 text-teal-600" />
        <h2 className="mt-4 font-serif text-2xl font-semibold text-forest-900">
          {t("submit")}
        </h2>
        <p className="mt-2 text-sm text-ink-500">{t("requestOnlyNotice")}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {t("stepOf", { current: step + 1, total: STEP_COUNT })}
        </p>
        <div className="mt-2 flex gap-1.5">
          {steps.map((label, i) => (
            <div
              key={label}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                i <= step ? "bg-forest-700" : "bg-forest-100"
              )}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-soft sm:p-8">
        {step === 0 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-forest-900">
              {t("selectDepartment")}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {departments.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => {
                    setDepartmentSlug(d.slug);
                    setDoctorId(undefined);
                  }}
                  className={cn(
                    "rounded-xl border p-3 text-left text-sm font-medium transition-colors",
                    departmentSlug === d.slug
                      ? "border-forest-700 bg-forest-50 text-forest-900"
                      : "border-forest-100 text-ink-700 hover:border-forest-300"
                  )}
                >
                  {d.name[locale]}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-forest-900">
              {t("selectDoctor")}
            </h2>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setDoctorId(undefined)}
                className={cn(
                  "rounded-xl border p-3 text-left text-sm font-medium transition-colors",
                  !doctorId
                    ? "border-forest-700 bg-forest-50 text-forest-900"
                    : "border-forest-100 text-ink-700 hover:border-forest-300"
                )}
              >
                {t("anyDoctor")}
              </button>
              {availableDoctors.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDoctorId(d.id)}
                  className={cn(
                    "rounded-xl border p-3 text-left text-sm font-medium transition-colors",
                    doctorId === d.id
                      ? "border-forest-700 bg-forest-50 text-forest-900"
                      : "border-forest-100 text-ink-700 hover:border-forest-300"
                  )}
                >
                  {d.name[locale]}
                  <span className="block text-xs font-normal text-ink-500">
                    {d.position[locale]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-forest-900">
              {t("selectDate")}
            </h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setDate(d);
                    setTime(undefined);
                  }}
                  className={cn(
                    "rounded-xl border p-2.5 text-center text-xs font-medium transition-colors",
                    date === d
                      ? "border-forest-700 bg-forest-50 text-forest-900"
                      : "border-forest-100 text-ink-700 hover:border-forest-300"
                  )}
                >
                  {formatLocalizedDate(d, locale)}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-forest-900">
              {t("selectTime")}
            </h2>
            {availableTimes.length === 0 ? (
              <p className="text-sm text-ink-500">{t("noSlotsForDate")}</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {availableTimes.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={cn(
                      "rounded-xl border p-2.5 text-center text-sm font-medium transition-colors",
                      time === slot
                        ? "border-forest-700 bg-forest-50 text-forest-900"
                        : "border-forest-100 text-ink-700 hover:border-forest-300"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-forest-900">
              {t("patientDetails")}
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-ink-700">{t("form.fullName")}</span>
                <input
                  {...register("fullName")}
                  placeholder={t("form.fullNamePlaceholder")}
                  className="rounded-lg border border-forest-200 px-3.5 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
                />
                {errors.fullName && (
                  <span className="text-xs text-red-600">{t("errors.nameTooShort")}</span>
                )}
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-ink-700">{t("form.phone")}</span>
                <input
                  {...register("phone")}
                  placeholder={t("form.phonePlaceholder")}
                  className="rounded-lg border border-forest-200 px-3.5 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
                />
                {errors.phone && (
                  <span className="text-xs text-red-600">{t("errors.phoneInvalid")}</span>
                )}
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-ink-700">
                  {t("form.comment")}{" "}
                  <span className="font-normal text-ink-300">({t("form.commentOptional")})</span>
                </span>
                <textarea
                  {...register("comment")}
                  placeholder={t("form.commentPlaceholder")}
                  rows={3}
                  className="rounded-lg border border-forest-200 px-3.5 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
                />
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-forest-900">
              {t("reviewTitle")}
            </h2>
            <dl className="divide-y divide-forest-100 text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-ink-500">{t("summary.department")}</dt>
                <dd className="font-medium text-forest-900">{department?.name[locale]}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-ink-500">{t("summary.doctor")}</dt>
                <dd className="font-medium text-forest-900">
                  {doctor?.name[locale] ?? t("anyDoctor")}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-ink-500">{t("summary.date")}</dt>
                <dd className="font-medium text-forest-900">
                  {date && formatLocalizedDate(date, locale)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-ink-500">{t("summary.time")}</dt>
                <dd className="font-medium text-forest-900">{time}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-ink-500">{t("summary.patient")}</dt>
                <dd className="font-medium text-forest-900">{getValues("fullName")}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-ink-500">{t("summary.phone")}</dt>
                <dd className="font-medium text-forest-900">{getValues("phone")}</dd>
              </div>
            </dl>
            <p className="mt-4 rounded-lg bg-sand-50 p-3 text-xs text-sand-800">
              {t("requestOnlyNotice")}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink-500 disabled:opacity-0"
          >
            <ChevronLeft className="h-4 w-4" />
            {tCommon("back")}
          </button>

          {step < STEP_COUNT - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext()}
              className="flex items-center gap-1 rounded-full bg-forest-700 px-6 py-2.5 text-sm font-semibold text-milk transition-colors hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {tCommon("next")}
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onFinalSubmit)}
              className="flex items-center gap-2 rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              <MessageCircle className="h-4 w-4" />
              {t("submit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
