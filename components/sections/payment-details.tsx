import { CreditCard, ShieldCheck, Clock } from "lucide-react";

const policies = [
  {
    icon: CreditCard,
    title: "Reservation Fee",
    points: [
      "50% deposit required to confirm your appointment",
      "Remaining balance due at the end of your session",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Payment Policy",
    points: [
      "We accept card, Apple Pay, bitcoin and cash",
      "Deposits are processed securely and applied to your final total",
    ],
  },
  {
    icon: Clock,
    title: "Cancellation Policy",
    points: [
      "Please cancel or reschedule at least 24 hours in advance",
      "Late cancellations or no-shows may forfeit the deposit",
    ],
  },
];

export function PaymentDetails() {
  return (
    <section className="bg-charcoal px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="gold-divider" /> Good to Know <span className="gold-divider" />
          </p>
          <h2 className="font-display text-3xl font-medium sm:text-5xl">Payment Details</h2>
        </div>

        <div className="space-y-5">
          {policies.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-xl2 glass border-l-2 border-gold p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg text-gold">{p.title}</h3>
                <ul className="mt-2 space-y-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-sm text-mist">{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}