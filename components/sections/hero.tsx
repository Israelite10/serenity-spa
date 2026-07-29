"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { images } from "@/lib/images";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={images.heroBackground}
          alt="Tranquil spa treatment room bathed in soft light"
          className="spa-photo h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-ink/50" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold sm:text-sm"
        >
          <span className="gold-divider" /> Luxury Wellness Sanctuary <span className="gold-divider" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-4xl font-medium leading-[1.1] text-white sm:text-6xl md:text-7xl"
        >
          Experience Luxury <span className="text-gradient-gold">Relaxation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-base text-mist sm:text-lg"
        >
          Premium wellness treatments designed to restore your body and mind.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/booking"
            className="w-full rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-transform hover:scale-105 hover:shadow-gold sm:w-auto"
          >
            Book Appointment
          </Link>
          <a
            href="#services"
            className="w-full rounded-full border border-white/25 px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:border-gold hover:text-gold sm:w-auto"
          >
            Explore Services
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/70"
        aria-label="Scroll to services"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
