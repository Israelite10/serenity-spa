import { z } from "zod";

// Basic US-style phone validation (10-15 digits, optional +, spaces, dashes, parens)
const phoneRegex = /^\+?[0-9()\-\s]{7,20}$/;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address"),
  contactMethod: z.enum(["PHONE", "EMAIL", "SMS", "WHATSAPP"]),
  serviceSlug: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  notes: z.string().max(1000).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in; bots usually do
  website: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(5).max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});
