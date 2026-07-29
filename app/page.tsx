import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Therapist } from "@/components/sections/therapist";
import { Gallery } from "@/components/sections/gallery";
import { PaymentDetails } from "@/components/sections/payment-details";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Therapist />
      <Gallery />
      <PaymentDetails />
      <Testimonials />
      <Contact />
    </>
  );
}
