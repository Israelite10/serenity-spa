import { UserButton } from "@clerk/nextjs";
import { AdminDashboard } from "@/components/admin/dashboard";

export const metadata = { title: "Admin Dashboard", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <section className="min-h-screen bg-ink px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl">Admin Dashboard</h1>
            <p className="text-sm text-mist">Manage bookings, customers, and services.</p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <AdminDashboard />
      </div>
    </section>
  );
}
