import { Resend } from "resend";
import { formatDate } from "./utils";

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "oliviabellaalvaro@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Serenity Spa <bookings@yourdomain.com>";

interface BookingEmailData {
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  preferredDate: Date | string;
  preferredTime: string;
  notes?: string | null;
}

export async function sendOwnerBookingNotification(data: BookingEmailData) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: "New Spa Booking Received",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color:#9C7B25;">New Spa Booking Received</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding:8px 0; color:#666;">Customer Name</td><td style="padding:8px 0;">${data.customerName}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0;">${data.customerPhone}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0;">${data.customerEmail}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Service</td><td style="padding:8px 0;">${data.serviceName}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Date</td><td style="padding:8px 0;">${formatDate(data.preferredDate)}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Time</td><td style="padding:8px 0;">${data.preferredTime}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Booking ID</td><td style="padding:8px 0;">${data.bookingCode}</td></tr>
          <tr><td style="padding:8px 0; color:#666; vertical-align:top;">Notes</td><td style="padding:8px 0;">${data.notes || "—"}</td></tr>
        </table>
      </div>
    `,
  });
}

export async function sendCustomerConfirmation(data: BookingEmailData) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Your Appointment is Confirmed — ${data.bookingCode}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background:#0B0B0B; color:#fff; padding:32px; border-radius:16px;">
        <h2 style="color:#D4AF37;">Thank you, ${data.customerName}!</h2>
        <p style="color:#A0A0A0;">We've received your booking request and can't wait to welcome you.</p>
        <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.25); border-radius:12px; padding:20px; margin:20px 0;">
          <p style="margin:4px 0;"><strong>Service:</strong> ${data.serviceName}</p>
          <p style="margin:4px 0;"><strong>Date:</strong> ${formatDate(data.preferredDate)}</p>
          <p style="margin:4px 0;"><strong>Time:</strong> ${data.preferredTime}</p>
          <p style="margin:4px 0;"><strong>Booking ID:</strong> ${data.bookingCode}</p>
        </div>
        <p style="color:#A0A0A0;">Your appointment is currently <strong style="color:#D4AF37;">pending confirmation</strong> — we'll reach out shortly to confirm the final details.</p>
        <p style="color:#A0A0A0;">Questions? Call or text us at 936 866 8505, or reply to this email.</p>
      </div>
    `,
  });
}

export async function sendContactMessageNotification(data: { name: string; email: string; message: string }) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: `New Contact Message from ${data.name}`,
    html: `<p><strong>${data.name}</strong> (${data.email}) wrote:</p><p>${data.message}</p>`,
  });
}
