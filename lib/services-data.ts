import { images } from "./images";

export interface ServiceInfo {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  durationMin: number;
  // durationHr: number;
  priceCents: number;
  image: string;
}

export const services: ServiceInfo[] = [
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    description:
      "Long, flowing strokes to ease tension and calm the nervous system.",
    longDescription:
      "Our signature Swedish massage uses long gliding strokes, kneading, and gentle circular movements to relax the entire body. Ideal for first-time guests or anyone seeking pure, unhurried relaxation.",
    durationMin: 30,
    priceCents: 12000,
    image: images.services["swedish-massage"],
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    description:
      "Targeted pressure to release chronic tension in muscles and connective tissue.",
    longDescription:
      "Firm, focused pressure works into deeper layers of muscle and fascia to relieve stubborn tension, improve mobility, and speed recovery from strain or overuse.",
    durationMin: 60,
    priceCents: 24000,
    image: images.services["deep-tissue-massage"],
  },
  {
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    description:
      "Warmed basalt stones melt away tension while easing you into deep relaxation.",
    longDescription:
      "Smooth, heated stones are placed on key points of the body and used as an extension of the therapist's hands, delivering soothing warmth alongside deep muscular release.",
    durationMin: 120,
    priceCents: 30000,
    image: images.services["hot-stone-massage"],
  },
  {
    slug: "full-body-massage",
    name: "Full Body Massage",
    description:
      "A complete head-to-toe treatment combining multiple techniques.",
    longDescription:
      "This comprehensive session blends Swedish, deep tissue, and reflexology techniques to address the whole body — perfect for guests who want it all in one visit.",
    durationMin: 180,
    priceCents: 40000,
    image: images.services["full-body-massage"],
  },
  {
    slug: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    description:
      "Essential oils paired with therapeutic touch for mind-body balance.",
    longDescription:
      "A calming blend of essential oils, chosen for your mood and needs, is incorporated into a full-body massage to soothe both body and mind.",
    durationMin: 240,
    priceCents: 50000,
    image: images.services["aromatherapy-massage"],
  },
  {
    slug: "couples-massage",
    name: "Couples Massage",
    description: "Side-by-side treatment in a private suite for two.",
    longDescription:
      "Share a moment of relaxation together in our private couples suite, with two therapists working in tandem so you can unwind side by side.",
    durationMin: 30,
    priceCents: 12000,
    image: images.services["couples-massage"],
  },
  {
    slug: "facial-treatment",
    name: "Facial Treatment",
    description:
      "Cleansing, exfoliation, and hydration for radiant, healthy skin.",
    longDescription:
      "A customized facial that cleanses, exfoliates, and deeply hydrates, leaving your skin refreshed, balanced, and glowing.",
    durationMin: 60,
    priceCents: 11000,
    image: images.services["facial-treatment"],
  },
  {
    slug: "body-treatment",
    name: "Body Treatment",
    description:
      "Exfoliating scrubs and nourishing wraps for total-body renewal.",
    longDescription:
      "A luxurious body scrub followed by a nourishing wrap, designed to exfoliate, hydrate, and leave skin silky-smooth from head to toe.",
    durationMin: 120,
    priceCents: 35500,
    image: images.services["body-treatment"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];
