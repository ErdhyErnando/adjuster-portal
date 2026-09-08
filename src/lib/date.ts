/**
 * Date helpers for the reka-ui Calendar (uses @internationalized/date CalendarDate).
 *
 * Form state stores dates as plain ISO strings ('YYYY-MM-DD') so they are
 * serializable and easy to send to the future Rails API. These helpers
 * convert between ISO strings and CalendarDate instances at the UI boundary.
 */

import { CalendarDate } from "@internationalized/date";

export function isoToCalendarDate(iso: string | null | undefined): CalendarDate | undefined {
  if (!iso) return undefined;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return undefined;

  return new CalendarDate(Number(match[1]), Number(match[2]), Number(match[3]));
}

export function calendarDateToIso(date: CalendarDate | undefined | null): string {
  if (!date) return "";

  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
}

/**
 * ISO date strings compare lexicographically when formatted as YYYY-MM-DD.
 * Returns a negative number when `a` is before `b`.
 */
export function compareIsoDates(a: string, b: string): number {
  return a.localeCompare(b);
}
