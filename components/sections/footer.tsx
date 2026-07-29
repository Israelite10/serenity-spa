import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-lg">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="text-gradient-gold">Serenity</span>
          <span className="font-light text-white/70">Spa</span>
        </div>
        <p className="text-center text-xs text-mist sm:text-sm">
          © {new Date().getFullYear()} Serenity Spa &amp; Wellness. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-mist">
          <Link href="/#services" className="hover:text-gold">Services</Link>
          <Link href="/#contact" className="hover:text-gold">Contact</Link>
          <Link href="/admin" className="hover:text-gold">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
