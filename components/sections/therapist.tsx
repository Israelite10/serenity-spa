"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { images } from "@/lib/images";

const specialties = ["Deep Tissue", "Hot Stone", "Aromatherapy", "Prenatal Massage", "Reflexology"];
const certifications = [
  "Licensed Massage Therapist (LMT)",
  "Certified in Aromatherapy Techniques",
  "Advanced Hot Stone Certification",
  "CPR & First Aid Certified",
];

export function Therapist() {
  return (
    <section className="bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl2 shadow-card"
        >
          <img src={images.therapistPortrait} alt="Portrait of our lead massage therapist" className="spa-photo h-full w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Meet Your Therapist
          </p>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">Olivia Bell</h2>
          <p className="mt-2 text-sm text-mist">Founder &amp; Lead Massage Therapist</p>

          <p className="mt-6 leading-relaxed text-mist">
            With over five years of hands-on experience, Olivia blends classical massage techniques with a genuinely
            personal approach — taking the time to understand each guest's needs before every session begins. Her
            calm, attentive presence is at the heart of Serenity's reputation for care.
          </p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-white">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <span key={s} className="rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs text-gold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-white">Certifications</p>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-mist">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-gold" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
