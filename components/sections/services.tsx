"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services-data";
import { formatPrice, formatDuration } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="relative bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Our Treatments <span className="gold-divider" />
          </p>
          <h2 className="font-display text-3xl font-medium sm:text-5xl">Signature Services</h2>
          <p className="mx-auto mt-4 max-w-xl text-mist">
            Each treatment is thoughtfully designed and delivered by certified therapists in a serene, private setting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="group overflow-hidden rounded-xl2 glass shadow-card transition-shadow hover:shadow-gold"
            >
              <Link href={`/services/${service.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="spa-photo h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-ink/70 p-2 backdrop-blur-sm">
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-white">{service.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-mist">{service.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-mist">
                      <Clock className="h-3.5 w-3.5" /> {formatDuration(service.durationMin)}
                    </span>
                    <span className="font-display text-lg text-gold">{formatPrice(service.priceCents)}</span>
                  </div>
                </div>
              </Link>
              <div className="border-t border-white/5 p-4">
                <Link
                  href={`/booking?service=${service.slug}`}
                  className="block w-full rounded-full bg-gold/10 py-2.5 text-center text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  Book This Service
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}