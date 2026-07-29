"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Calendar, Users, Image as ImageIcon, Star, Settings } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";

interface Booking {
  id: string;
  bookingCode: string;
  status: string;
  preferredDate: string;
  preferredTime: string;
  notes: string | null;
  customer: { name: string; email: string; phone: string };
  service: { name: string; priceCents: number };
}

const tabs = [
  { key: "bookings", label: "Bookings", icon: Calendar },
  { key: "customers", label: "Customers", icon: Users },
  { key: "services", label: "Services", icon: Settings },
  { key: "gallery", label: "Gallery", icon: ImageIcon },
  { key: "reviews", label: "Testimonials", icon: Star },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400",
  APPROVED: "bg-green-500/15 text-green-400",
  REJECTED: "bg-red-500/15 text-red-400",
  CANCELLED: "bg-white/10 text-mist",
  RESCHEDULED: "bg-blue-500/15 text-blue-400",
  COMPLETED: "bg-gold/15 text-gold",
};

export function AdminDashboard() {
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [calView, setCalView] = useState<"daily" | "weekly" | "monthly">("monthly");

  const load = useCallback(async (q?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(bookingId: string, status: string) {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, status }),
    });
  }

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-white/10 pb-px">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${
              tab === t.key ? "border-gold text-gold" : "border-transparent text-mist hover:text-white"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "bookings" && (
        <div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load(query)}
                placeholder="Search name, email, phone, or booking ID"
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm placeholder:text-mist focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex gap-2 rounded-lg border border-white/10 p-1">
              {(["daily", "weekly", "monthly"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setCalView(v)}
                  className={`rounded px-3 py-1.5 text-xs capitalize ${
                    calView === v ? "bg-gold text-ink" : "text-mist hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl2 glass">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-mist">
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Date / Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-mist">Loading bookings…</td></tr>
                )}
                {!loading && bookings.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-mist">No bookings found.</td></tr>
                )}
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 last:border-none">
                    <td className="px-4 py-3 font-medium text-gold">{b.bookingCode}</td>
                    <td className="px-4 py-3">
                      <p className="text-white">{b.customer.name}</p>
                      <p className="text-xs text-mist">{b.customer.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{b.service.name}</p>
                      <p className="text-xs text-mist">{formatPrice(b.service.priceCents)}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-mist">
                      {formatDate(b.preferredDate)} · {b.preferredTime}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs ${statusColors[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className="rounded border border-white/10 bg-charcoal px-2 py-1 text-xs"
                      >
                        {Object.keys(statusColors).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-mist">
            Calendar view ({calView}) — plug in a library like react-big-calendar or FullCalendar, feeding it from
            this same booking data, to render actual day/week/month grids.
          </p>
        </div>
      )}

      {tab !== "bookings" && (
        <div className="rounded-xl2 glass p-10 text-center text-mist">
          <p>
            {tabs.find((t) => t.key === tab)?.label} management connects to the same Prisma models
            (Customer, Service, Review) — build out a table + edit form here following the same pattern as the
            Bookings tab above.
          </p>
        </div>
      )}
    </div>
  );
}
