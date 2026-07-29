import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// Deposit is a flat percentage of the service price; adjust as needed.
export const DEPOSIT_PERCENT = 0.25;

export function calculateDepositCents(fullPriceCents: number) {
  return Math.round(fullPriceCents * DEPOSIT_PERCENT);
}
