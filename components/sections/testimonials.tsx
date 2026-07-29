"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { images } from "@/lib/images";

const reviews = [
  {
    name: "Amanda R.",
    rating: 5,
    text: "The most relaxing experience I've had at a spa. Olivia's hot stone massage completely melted away weeks of tension.",
    avatar: images.testimonialAvatars[0],
  },
  {
    name: "James T.",
    rating: 5,
    text: "From the moment I walked in, everything felt calm and intentional. Booking was easy and the confirmation was instant.",
    avatar: images.testimonialAvatars[1],
  },
  {
    name: "Priya K.",
    rating: 5,
    text: "My partner and I did the couples massage for our anniversary — it was worth every penny. We're already planning our next visit.",
    avatar: images.testimonialAvatars[2],
  },
  {
    name: "Marcus D.",
    rating: 4,
    text: "Deep tissue massage worked out knots I've had for months. Professional, warm, and genuinely skilled.",
    avatar: images.testimonialAvatars[3],
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const review = reviews[index];

  return (
    <section id="testimonials" className="bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
          <span className="gold-divider" /> Client Love <span className="gold-divider" />
        </p>
        <h2 className="font-display text-3xl font-medium sm:text-5xl">Testimonials</h2>

        <div className="relative mt-14 min-h-[280px]">
          <Quote className="mx-auto mb-4 h-8 w-8 text-gold/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mx-auto max-w-xl text-lg text-white/90 sm:text-xl">"{review.text}"</p>
              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-gold text-gold" : "text-white/20"}`}
                  />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <img src={review.avatar} alt={review.name} className="spa-photo h-10 w-10 rounded-full object-cover" />
                <span className="text-sm font-medium text-white">{review.name}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="rounded-full border border-white/15 p-3 text-mist transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="rounded-full border border-white/15 p-3 text-mist transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
