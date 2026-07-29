import { db } from "./db";

/**
 * Generates sequential, human-readable booking codes: SPA-YYYYMMDD-0001
 * Sequence resets daily, padded to 4 digits (rolls to 5+ digits past 9999/day).
 */
export async function generateBookingCode(): Promise<string> {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const datePart = `${y}${m}${d}`;

  const startOfDay = new Date(y, now.getMonth(), now.getDate());
  const endOfDay = new Date(y, now.getMonth(), now.getDate() + 1);

  const countToday = await db.booking.count({
    where: { createdAt: { gte: startOfDay, lt: endOfDay } },
  });

  const sequence = String(countToday + 1).padStart(4, "0");
  return `SPA-${datePart}-${sequence}`;
}
