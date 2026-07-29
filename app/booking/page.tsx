import { Suspense } from "react";
import { BookingForm } from "@/components/sections/booking-form";

export const metadata = {
  title: "Book Your Appointment",
  description: "Book your appointment at Serenity Spa & Wellness in just a few steps.",
};

export default function BookingPage() {
  return (
    <section className="min-h-screen bg-ink px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Reserve Your Time <span className="gold-divider" />
          </p>
          <h1 className="font-display text-3xl font-medium sm:text-5xl">Book Your Appointment</h1>
          <p className="mx-auto mt-4 max-w-md text-mist">
            Fill out the form below and we'll confirm your appointment by phone or email.
          </p>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl2 glass" />}>
          <BookingForm />
        </Suspense>
      </div>
    </section>
  );
}
