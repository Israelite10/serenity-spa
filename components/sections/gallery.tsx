"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { images } from "@/lib/images";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-charcoal px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Inside Serenity <span className="gold-divider" />
          </p>
          <h2 className="font-display text-3xl font-medium sm:text-5xl">Gallery</h2>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {images.gallery.map((src, i) => (
            <motion.button
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              onClick={() => setActive(i)}
              className="group relative block w-full overflow-hidden rounded-xl2 break-inside-avoid"
              aria-label="Open gallery image"
            >
              <img
                src={src}
                alt={`Serenity Spa interior and treatment moments, image ${i + 1}`}
                className="spa-photo w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-6"
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 text-white/70 hover:text-gold"
              onClick={() => setActive(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={images.gallery[active]}
              alt="Expanded gallery image"
              className="spa-photo max-h-[85vh] max-w-full rounded-xl2 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
