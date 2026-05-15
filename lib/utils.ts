import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Convert UTC dates to user's local time
function toUserLocalTime(date: Date, userTimeZone: string) {
  try {
    return new Date(date.toLocaleString("en-US", { timeZone: userTimeZone }));
  } catch {
    return date;
  }
}


const formatAmountForDisplay = (
  amount: number,
  currency: string,
  withSymbol = true
): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: withSymbol ? "currency" : "decimal",
    currency,
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};


export {
  toUserLocalTime, formatAmountForDisplay,
};