import twilio from "twilio";
import { formatDate } from "./utils";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const BUSINESS_PHONE_NUMBER = process.env.BUSINESS_PHONE_NUMBER || "+19368668505";

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

interface BookingSmsData {
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  preferredDate: Date | string;
  preferredTime: string;
}

export async function sendOwnerBookingSms(data: BookingSmsData) {
  if (!client || !fromNumber) {
    console.warn("[sms] Twilio not configured — skipping SMS send. Set TWILIO_* env vars to enable.");
    return null;
  }

  const body = [
    "NEW SPA BOOKING",
    "",
    `Customer: ${data.customerName}`,
    `Phone: ${data.customerPhone}`,
    `Service: ${data.serviceName}`,
    `Date: ${formatDate(data.preferredDate)}`,
    `Time: ${data.preferredTime}`,
    `Booking ID: ${data.bookingCode}`,
  ].join("\n");

  return client.messages.create({
    body,
    from: fromNumber,
    to: BUSINESS_PHONE_NUMBER,
  });
}
