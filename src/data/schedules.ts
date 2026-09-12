import type { DoctorSchedule } from "@/types";
import { doctors } from "./doctors";

/**
 * DEMO SCHEDULES. Every doctor works Mon–Fri (1–5), 09:00–18:00, with a
 * standard slot length. This is a placeholder shape only — the real
 * schedule is expected to come from a CRM/calendar integration later
 * (see task requirement: keep the interface stable for that swap).
 */
export const schedules: DoctorSchedule[] = doctors.map((doctor) => ({
  doctorId: doctor.id,
  workingDays: [1, 2, 3, 4, 5],
  dayStart: "09:00",
  dayEnd: "18:00",
  appointmentDurationMinutes: 30,
  unavailableDates: [],
  unavailableSlots: [],
}));

export function getScheduleForDoctor(doctorId: string): DoctorSchedule | undefined {
  return schedules.find((s) => s.doctorId === doctorId);
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Returns available HH:mm slots for a doctor on a given ISO date (YYYY-MM-DD). */
export function getAvailableSlots(doctorId: string, isoDate: string): string[] {
  const schedule = getScheduleForDoctor(doctorId);
  if (!schedule) return [];

  const date = new Date(`${isoDate}T00:00:00`);
  const weekday = date.getDay();
  if (!schedule.workingDays.includes(weekday)) return [];
  if (schedule.unavailableDates.includes(isoDate)) return [];

  const start = timeToMinutes(schedule.dayStart);
  const end = timeToMinutes(schedule.dayEnd);
  const step = schedule.appointmentDurationMinutes;
  const blocked = new Set(
    schedule.unavailableSlots.filter((s) => s.date === isoDate).map((s) => s.time)
  );

  const slots: string[] = [];
  for (let t = start; t + step <= end; t += step) {
    const time = minutesToTime(t);
    if (!blocked.has(time)) slots.push(time);
  }
  return slots;
}
