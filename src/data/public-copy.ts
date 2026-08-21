import type { SupportedLocale } from "./localization-contract.ts";

export type HomePageContent = Record<string, string>;

const homeDefaults: HomePageContent = {
  title: "Nine Centres",
  hero_kicker: "Human Design readings",
  hero_title: "Your chart already knows how you were built to decide.",
  hero_body:
    "A map of how you are built to decide, drawn from your birth data. Start with the free chart.",
  hero_subtext: "Coloured centres show consistent energy. Open centres show where you receive and amplify what is around you.",
  hero_side_note: "Your chart is information, not instruction. Test what it shows in ordinary decisions.",
  generator_title: "Generate your bodygraph",
  generator_body: "The chart plus a short summary of your type, authority and profile. Do not know your birth time? An estimate is fine.",
  nine_centres_eyebrow: "Bodygraph anatomy",
  nine_centres_title: "Nine centres, one operating system",
  concepts_eyebrow: "01 · Foundations",
  concepts_title: "What Human Design actually is",
  types_eyebrow: "02 · The five types",
  types_title: "Everybody is one of five",
  types_hint: "Select one to read its strategy.",
  readings_eyebrow: "03 · Readings",
  readings_title: "One full reading, yours to keep",
  readings_note: "USD · sliding scale on request",
  how_eyebrow: "04 · The process",
  how_title: "Four steps, no homework",
  letters_eyebrow: "What changed after the reading",
  faq_eyebrow: "05 · Questions",
  faq_title: "Before you book",
  articles_eyebrow: "06 · Field notes",
  articles_title: "Reading the chart yourself",
  articles_view_all: "View all articles →",
  final_cta_title: "Start with the chart. Decide about the reading after.",
  final_cta_button: "Get your free bodygraph",
  hero_primary_cta: "Generate my free chart",
  hero_secondary_cta: "See reading options",
  feature_1_title: "Nine centres diagram",
  feature_1_body: "Defined centres are consistent in you. Open ones are where you absorb everyone else.",
  feature_2_title: "Five energy types",
  feature_2_body: "Manifestor, Generator, Manifesting Generator, Projector, and Reflector.",
  feature_3_title: "Three reading formats",
  feature_3_body: "Foundational, Composite, and Deconditioning series with lifetime recording.",
  footer_note: "Read by one person. Sent within a day.",
  not_found_title: "Page not found",
  not_found_body: "This route is not part of the Nine Centres site.",
  not_found_cta: "Return to home",
  seo_title: "Nine Centres — Your chart already knows how you were built to decide.",
  seo_description: "A map of how you are built to decide, drawn from your birth date, time and place.",
  seo_canonical_path: "/",
  seo_robots: "index,follow",
  og_title: "Nine Centres — Human Design Chart & Readings",
  og_description: "Generate your free bodygraph. Understand your energy type, inner authority, and 9 centres.",
  og_image: "/_assets/aliases/logo/logo.svg",
  og_image_alt: "Nine Centres Human Design Diagram",
  twitter_card: "summary_large_image",
  twitter_title: "Nine Centres — Human Design",
  twitter_description: "Calculate your Human Design chart and explore your energy mechanics.",
  twitter_image: "/_assets/aliases/logo/logo.svg",
};

const chromeDefaults: HomePageContent = {
  title: "Site Chrome",
  brand_name: "Nine Centres",
  nav_home: "Home",
  footer_brand_name: "Nine Centres",
  footer_about: "Every chart on this page is drawn and read by one person, in plain language, and the recording stays yours.",
};

export const getHomeDefaults = (_locale: SupportedLocale = "en"): HomePageContent => ({
  ...homeDefaults,
});

export const getChromeDefaults = (_locale: SupportedLocale = "en"): HomePageContent => ({
  ...chromeDefaults,
});
