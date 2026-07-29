/**
 * IMAGE SOURCING NOTE
 * --------------------
 * These use Picsum (https://picsum.photos) as neutral, license-free placeholder
 * imagery (no attribution required, safe for commercial placeholder use), styled
 * with a dark gold duotone filter (see globals.css `.spa-photo`) so they read as
 * "spa/wellness" regardless of subject matter.
 *
 * Before launch, replace every entry below with your own licensed photography —
 * either photos you or your therapist own the rights to, or images purchased /
 * downloaded with a commercial license from a stock library such as:
 *   - Unsplash (unsplash.com)  — free commercial license
 *   - Pexels (pexels.com)      — free commercial license
 *   - Adobe Stock / Getty      — paid, highest quality
 * Search terms that work well: "massage therapy", "spa treatment room",
 * "hot stone massage", "facial spa", "zen wellness".
 *
 * Swap by replacing the `src` value — every component below reads from here,
 * so this is the only file you need to touch.
 */

export const images = {
  heroBackground: "/images/pic7.jpg",
  aboutStory: "/images/pic15.jpeg",
  therapistPortrait: "/images/pic14.jpg",
  services: {
    "swedish-massage": "/images/pic1.jpg",
    "deep-tissue-massage": "/images/pic2.jpg",
    "hot-stone-massage": "/images/pic3.jpg",
    "full-body-massage": "/images/pic4.jpg",
    "aromatherapy-massage": "/images/pic5.jpg",
    "couples-massage": "/images/pic6.jpg",
    "facial-treatment": "/images/pic7.jpg",
    "body-treatment": "/images/pic8.jpg",
  } as Record<string, string>,
  gallery: [
    "/images/pic9.jpg",
    "/images/pic10.jpg",
    "/images/pic11.jpg",
    "/images/pic12.jpg",
    "/images/pic13.jpg",
    "/images/pic14.jpg",
  ],
  testimonialAvatars: [
    "https://picsum.photos/id/64/200/200",
    "https://picsum.photos/id/65/200/200",
    "https://picsum.photos/id/91/200/200",
    "https://picsum.photos/id/177/200/200",
  ],
};
