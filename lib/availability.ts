/**
 * Slot availability for a given date.
 *
 * This is stubbed to a fixed 9am–6pm hourly grid so the booking flow can be
 * built and tested end to end right now. When real availability (DB, a
 * calendar API, per-dentist schedules, etc.) is ready, replace the body of
 * this function — keep the signature and the `string[]` return shape
 * (human-readable slot labels like "10:00 AM") so nothing else has to change.
 *
 * Example of what the real version might look like:
 *   export async function getAvailableSlots(date: Date) {
 *     const booked = await db.appointment.findMany({ where: { date } });
 *     return ALL_SLOTS.filter((slot) => !booked.some((b) => b.slot === slot));
 *   }
 */
export async function getAvailableSlots(date: Date): Promise<string[]> {
  const OPEN_HOUR = 9;
  const CLOSE_HOUR = 18;

  const slots: string[] = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour > 12 ? hour - 12 : hour;
    slots.push(`${hour12}:00 ${period}`);
  }

  // Clinics are usually closed Sundays — trivial example of date-based logic
  // this stub can already support; extend or remove once real data is wired in.
  if (date.getDay() === 0) return [];

  return slots;
}