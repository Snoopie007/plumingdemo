import { clsx, type ClassValue } from "clsx"
import { addDays, isBefore, startOfDay, startOfWeek } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Generate username from name (Discord-style)
function generateUsername(name: string): string {
  const cleaned = (name || 'user').toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 32);
  return cleaned.length >= 2 ? cleaned : cleaned + 'user';
}


function startOfToday() {
  return startOfDay(new Date());
}


function weekDaysFor(date: Date) {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

// Convert UTC dates to user's local time
function toUserLocalTime(date: Date, userTimeZone: string) {
  try {
    return new Date(date.toLocaleString("en-US", { timeZone: userTimeZone }));
  } catch {
    return date;
  }
}
export { generateUsername, startOfToday, weekDaysFor, toUserLocalTime };