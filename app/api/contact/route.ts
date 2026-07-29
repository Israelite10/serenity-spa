import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactMessageNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { allowed } = rateLimit(`contact:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ success: true });
  }

  try {
    await db.message.create({ data: { name: data.name, email: data.email, message: data.message } });
    await sendContactMessageNotification(data).catch((e) => console.error("[contact] email failed:", e));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
