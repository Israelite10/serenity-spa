"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { services, timeSlots } from "@/lib/services-data";

const contactMethods = [
  { value: "PHONE", label: "Phone Call" },
  { value: "EMAIL", label: "Email" },
  { value: "SMS", label: "Text Message" },
  { value: "WHATSAPP", label: "WhatsApp" },
];

export function BookingForm() {
  const params = useSearchParams();
  const preselected = params.get("service") || "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingCode, setBookingCode] = useState("");

  const minDate = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      contactMethod: fd.get("contactMethod"),
      serviceSlug: fd.get("serviceSlug"),
      preferredDate: fd.get("preferredDate"),
      preferredTime: fd.get("preferredTime"),
      notes: fd.get("notes"),
      website: fd.get("website"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setBookingCode(data.bookingCode);
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl2 glass p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-2xl text-white">Booking Received!</h2>
        <p className="mt-2 text-mist">
          Your booking ID is <span className="font-medium text-gold">{bookingCode}</span>. We've sent a confirmation
          to your email and will reach out shortly to finalize your appointment.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl2 glass p-6 sm:p-10">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name">
          <input required name="name" placeholder="Jane Doe" className="input" />
        </Field>
        <Field label="Phone Number">
          <input required name="phone" type="tel" placeholder="(555) 555-5555" className="input" />
        </Field>
      </div>

      <Field label="Email Address">
        <input required name="email" type="email" placeholder="you@example.com" className="input" />
      </Field>

      <Field label="Preferred Contact Method">
        <select required name="contactMethod" defaultValue="" className="input">
          <option value="" disabled>Select a method</option>
          {contactMethods.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </Field>

      <Field label="Service">
        <select required name="serviceSlug" defaultValue={preselected} className="input">
          <option value="" disabled>Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} — {s.durationMin} min
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred Date">
          <input required name="preferredDate" type="date" min={minDate} className="input" />
        </Field>
        <Field label="Preferred Time">
          <select required name="preferredTime" defaultValue="" className="input">
            <option value="" disabled>Select a time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Additional Notes (optional)">
        <textarea name="notes" rows={3} placeholder="Anything we should know before your visit?" className="input" />
      </Field>

      {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Submitting..." : "Confirm Booking Request"}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: white;
        }
        .input::placeholder { color: #A0A0A0; }
        .input:focus { border-color: #D4AF37; outline: none; }
        .input option { background: #141210; color: white; }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-mist">{label}</span>
      {children}
    </label>
  );
}
