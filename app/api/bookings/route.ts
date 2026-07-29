import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { generateBookingCode } from "@/lib/booking-code";
import { getServiceBySlug } from "@/lib/services-data";
import { sendOwnerBookingNotification, sendCustomerConfirmation } from "@/lib/email";
import { sendOwnerBookingSms } from "@/lib/sms";

export async function POST(req: NextRequest) {
  // --- Rate limiting (basic spam protection) ---
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { allowed } = rateLimit(`booking:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // --- Validation ---
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot check — silently "succeed" without doing anything if a bot filled it in
  if (data.website) {
    return NextResponse.json({ success: true, bookingCode: "SPA-00000000-0000" });
  }

  const service = getServiceBySlug(data.serviceSlug);
  if (!service) {
    return NextResponse.json({ error: "Selected service was not found" }, { status: 400 });
  }

  try {
    // --- Upsert customer ---
    let customer = await db.customer.findFirst({ where: { email: data.email } });
    if (!customer) {
      customer = await db.customer.create({
        data: { name: data.name, email: data.email, phone: data.phone },
      });
    }

    // --- Ensure the service exists in the DB (idempotent seed-on-write) ---
    const dbService = await db.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        name: service.name,
        description: service.description,
        durationMin: service.durationMin,
        priceCents: service.priceCents,
        imageUrl: service.image,
      },
    });

    // --- Generate booking ID + save booking, status PENDING ---
    const bookingCode = await generateBookingCode();
    const booking = await db.booking.create({
      data: {
        bookingCode,
        customerId: customer.id,
        serviceId: dbService.id,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        contactMethod: data.contactMethod,
        notes: data.notes || null,
        status: "PENDING",
      },
    });

    // --- Notifications (owner SMS + email, customer email) ---
    const emailPayload = {
      bookingCode: booking.bookingCode,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      serviceName: service.name,
      preferredDate: booking.preferredDate,
      preferredTime: data.preferredTime,
      notes: data.notes,
    };

    const results = await Promise.allSettled([
      sendOwnerBookingSms({
        bookingCode: booking.bookingCode,
        customerName: data.name,
        customerPhone: data.phone,
        serviceName: service.name,
        preferredDate: booking.preferredDate,
        preferredTime: data.preferredTime,
      }),
      sendOwnerBookingNotification(emailPayload),
      sendCustomerConfirmation(emailPayload),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`[bookings] notification #${i} failed:`, r.reason);
      }
    });

    return NextResponse.json({ success: true, bookingCode: booking.bookingCode });
  } catch (err) {
    console.error("[bookings] failed to create booking:", err);
    return NextResponse.json(
      { error: "Something went wrong while saving your booking. Please try again." },
      { status: 500 }
    );
  }
}
