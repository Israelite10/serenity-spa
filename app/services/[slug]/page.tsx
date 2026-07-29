import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Check } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services-data";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <section className="min-h-screen bg-ink px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-xl2 shadow-card">
          <img src={service.image} alt={service.name} className="spa-photo aspect-[4/3] w-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl font-medium sm:text-4xl">{service.name}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm text-mist">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {service.durationMin} minutes</span>
            <span className="font-display text-xl text-gold">{formatPrice(service.priceCents)}</span>
          </div>

          <p className="mt-6 leading-relaxed text-mist">{service.longDescription}</p>

          <ul className="mt-6 space-y-2">
            {["Certified therapist", "Private treatment room", "Premium products included"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                <Check className="h-4 w-4 text-gold" /> {f}
              </li>
            ))}
          </ul>

          <Link
            href={`/booking?service=${service.slug}`}
            className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            Book This Service
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-5xl">
        <h2 className="mb-6 font-display text-2xl">Other Treatments</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {services.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group overflow-hidden rounded-xl2 glass">
              <img src={s.image} alt={s.name} className="spa-photo h-28 w-full object-cover transition-transform group-hover:scale-110" />
              <p className="p-3 text-sm">{s.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
