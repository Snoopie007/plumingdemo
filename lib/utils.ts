import { clsx, type ClassValue } from "clsx"
import { addDays, startOfDay, startOfWeek } from "date-fns";
import { twMerge } from "tailwind-merge"
import type { PaymentType } from "@/types";

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



const STRIPE_FEE_PERCENT = 2.9
const STRIPE_FEE_AMOUNT = 0.30
const STRIPE_BANK_FEE = 0.8;

function calculateGatewayFeeAmount(amount: number, paymentType: PaymentType, isRecurring?: boolean) {
  if (amount <= 0) return 0;
  if (paymentType === 'us_bank_account') {
    return Math.ceil(amount * (STRIPE_BANK_FEE / 100));
  }
  const fees = Math.ceil(amount * (STRIPE_FEE_PERCENT / 100)) + (STRIPE_FEE_AMOUNT * 100);
  const feeOnStripeFees = Math.ceil(fees * (STRIPE_FEE_PERCENT / 100));

  return fees + feeOnStripeFees;
}

export {
  generateUsername, startOfToday, weekDaysFor,
  toUserLocalTime, formatAmountForDisplay, calculateGatewayFeeAmount
};