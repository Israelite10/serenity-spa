"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MessageSquare, Send, Loader2 } from "lucide-react";

const contactCards = [
  {
    label: "Phone",
    value: "936 866 8505",
    icon: Phone,
    href: "tel:+19368668505",
    cta: "Call Now",
  },
  {
    label: "WhatsApp",
    value: "936 866 8505",
    icon: MessageCircle,
    href: "https://wa.me/19368668505",
    cta: "WhatsApp Chat",
  },
  {
    label: "Email",
    value: "oliviabellaalvaro@gmail.com",
    icon: Mail,
    href: "mailto:oliviabellaalvaro@gmail.com",
    cta: "Email Us",
  },
  {
    label: "iMessage",
    value: "669 225 3806",
    icon: MessageSquare,
    href: "sms:+16692253806",
    cta: "Message Us",
  },
  {
    label: "Signal",
    value: "573 530 9136",
    icon: Send,
    href: "https://signal.me/#p/+15735309136",
    cta: "Message Us",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-charcoal px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Get In Touch <span className="gold-divider" />
          </p>
          <h2 className="font-display text-3xl font-medium sm:text-5xl">Contact Us</h2>
          <p className="mx-auto mt-4 max-w-xl text-mist">Reach out however is easiest for you — we respond quickly.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {contactCards.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col items-center rounded-xl2 glass p-6 text-center transition-shadow hover:shadow-gold"
            >
              <span className="mb-4 rounded-full bg-gold/10 p-3 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                <c.icon className="h-5 w-5" />
              </span>
              <p className="text-xs uppercase tracking-wide text-mist">{c.label}</p>
              <p className="mt-1 break-all text-sm text-white">{c.value}</p>
              <span className="mt-4 text-xs font-medium text-gold">{c.cta} →</span>
            </motion.a>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-2xl rounded-xl2 glass p-6 sm:p-10"
        >
          <h3 className="mb-6 font-display text-2xl text-white">Send a Message</h3>
          {/* Honeypot field — hidden from real users via CSS, catches simple bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              placeholder="Your Name"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-mist focus:border-gold focus:outline-none"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Your Email"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-mist focus:border-gold focus:outline-none"
            />
          </div>
          <textarea
            required
            name="message"
            rows={4}
            placeholder="How can we help?"
            className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-mist focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && <p className="mt-3 text-center text-sm text-gold">Thanks — we'll be in touch shortly!</p>}
          {status === "error" && <p className="mt-3 text-center text-sm text-red-400">Something went wrong. Please try again.</p>}
        </motion.form>
      </div>
    </section>
  );
}
