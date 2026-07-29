"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, ShieldCheck, Users } from "lucide-react";
import { images } from "@/lib/images";

const stats = [
  { label: "Years Experience", value: "5+", icon: Leaf },
  { label: "Happy Clients", value: "1000+", icon: Users },
  { label: "Certified Therapist", value: "100%", icon: ShieldCheck },
  { label: "Premium Environment", value: "Always", icon: Heart },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-card">
            <img src={images.aboutStory} alt="Serene spa interior with soft ambient lighting" className="spa-photo h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden rounded-xl2 glass p-6 shadow-gold sm:block sm:-right-8">
            <p className="font-display text-3xl text-gold">5+</p>
            <p className="text-xs text-mist">Years of Excellence</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Our Story
          </p>
          <h2 className="font-display text-3xl font-medium sm:text-5xl">
            A Sanctuary Built Around You
          </h2>
          <p className="mt-6 text-mist leading-relaxed">
            Serenity Spa &amp; Wellness was founded on a simple belief: true relaxation is a form of care, not a
            luxury reserved for special occasions. Every treatment is delivered with intention, in a space designed
            to quiet the noise of everyday life.
          </p>
          <p className="mt-4 text-mist leading-relaxed">
            Our mission is to help every guest leave feeling lighter than when they arrived. Our vision is a place
            where wellness feels personal, unrushed, and genuinely restorative — every single visit.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl2 glass p-5">
                <s.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <p className="mt-3 font-display text-2xl text-white">{s.value}</p>
                <p className="text-xs text-mist">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
