"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-gold/10 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/#home" className="flex items-center gap-2 font-display text-xl tracking-wide sm:text-2xl">
          <Sparkles className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="text-gradient-gold">Serenity</span>
          <span className="text-white/80 font-light">Spa</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-mist transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/booking"
            className="rounded-full border border-gold/60 bg-gold/10 px-6 py-2.5 text-sm font-medium tracking-wide text-gold transition-all hover:bg-gold hover:text-ink hover:shadow-gold"
          >
            Book Appointment
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gold/10 bg-ink/97 backdrop-blur-md lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-mist transition-colors hover:text-gold border-b border-white/5 last:border-none"
                >
                  {l.label}
                </a>
              ))}
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold tracking-wide text-ink"
              >
                Book Appointment
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
