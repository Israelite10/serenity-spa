import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Note: middleware.ts already blocks unauthenticated access to /api/admin/*,
// this is a defense-in-depth check for anyone calling the route directly.
async function requireAdmin() {
  const { userId } = auth();
  return !!userId;
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const search = req.nextUrl.searchParams.get("q")?.trim();

  const bookings = await db.booking.findMany({
    where: search
      ? {
          OR: [
            { bookingCode: { contains: search, mode: "insensitive" } },
            { customer: { name: { contains: search, mode: "insensitive" } } },
            { customer: { email: { contains: search, mode: "insensitive" } } },
            { customer: { phone: { contains: search, mode: "insensitive" } } },
          ],
        }
      : undefined,
    include: { customer: true, service: true },
    orderBy: { preferredDate: "asc" },
    take: 200,
  });

  return NextResponse.json({ bookings });
}

const updateSchema = z.object({
  bookingId: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "CANCELLED", "RESCHEDULED", "COMPLETED"]).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { bookingId, ...rest } = parsed.data;
  const booking = await db.booking.update({
    where: { id: bookingId },
    data: {
      ...(rest.status ? { status: rest.status } : {}),
      ...(rest.preferredDate ? { preferredDate: new Date(rest.preferredDate) } : {}),
      ...(rest.preferredTime ? { preferredTime: rest.preferredTime } : {}),
    },
  });

  return NextResponse.json({ booking });
}
