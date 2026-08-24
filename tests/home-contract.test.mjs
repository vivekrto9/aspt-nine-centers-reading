import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("Nine Centres Reading declares canonical typography pairs and color tokens", () => {
  const baseCss = read("src/styles/base.css");
  assert.equal(baseCss.includes("--color-cobalt: oklch(0.52 0.09 165);"), true);
  assert.equal(baseCss.includes("--color-accent: oklch(0.52 0.09 165);"), true);
  assert.equal(baseCss.includes("--color-cream: #FBFBF9;"), true);
  assert.equal(baseCss.includes("--color-ink: #17191A;"), true);
  assert.equal(baseCss.includes("--font-display: 'Libre Caslon Text'"), true);
  assert.equal(baseCss.includes("--font-sans: 'Space Grotesk'"), true);
  assert.match(read("src/components/shared/Header.astro"), /position: sticky/);
  assert.match(read("src/components/home/sections/HomeHero.astro"), /Your chart already knows how you were built to decide/);
  assert.match(read("src/components/home/sections/HeroBodygraphPlate.astro"), /9 centres · 64 gates · 36 channels/);
});

test("homepage sections do not regress to the Cobalt palette", () => {
  const sectionFiles = [
    "HomeHero",
    "BodygraphGeneratorSection",
    "FourConceptsSection",
    "FiveTypesSection",
    "ThreeReadingsSection",
    "HowItRunsSection",
    "ClientLettersSection",
    "FaqSection",
    "ArticlesSection",
    "FinalCtaSection",
    "BodygraphExplorerView",
  ];
  const legacyPalette = /#(?:1230c8|0a1030|f5f1e8|ff6b4a|9096ad|4b5169|b9c4ff)/i;

  for (const section of sectionFiles) {
    assert.doesNotMatch(
      read(`src/components/home/sections/${section}.astro`),
      legacyPalette,
      `${section} contains a legacy Cobalt color`,
    );
  }
});

test("Home page composes the reference homepage sections without a duplicate anatomy plate", () => {
  const indexAstro = read("src/pages/index.astro");
  assert.equal(indexAstro.includes("<HomeHero"), true);
  assert.equal(indexAstro.includes("<BodygraphGeneratorSection"), true);
  assert.equal(indexAstro.includes("<NineCentresSection"), false);
  assert.equal(indexAstro.includes("<FourConceptsSection"), true);
  assert.equal(indexAstro.includes("<FiveTypesSection"), true);
  assert.equal(indexAstro.includes("<ThreeReadingsSection"), true);
  assert.equal(indexAstro.includes("<HowItRunsSection"), true);
  assert.equal(indexAstro.includes("<ClientLettersSection"), true);
  assert.equal(indexAstro.includes("<FaqSection"), true);
  assert.equal(indexAstro.includes("<ArticlesSection"), true);
  assert.equal(indexAstro.includes("<FinalCtaSection"), true);
  assert.equal(indexAstro.includes("<Header"), true);
  assert.equal(indexAstro.includes("<Footer"), true);
  assert.equal(indexAstro.includes("<MasterclassCourseView"), false);
});

test("homepage chart form and footer follow the supplied reading reference", () => {
  const generator = read("src/components/home/sections/BodygraphGeneratorSection.astro");
  const homeCss = read("src/styles/almanac-home.css");
  const footer = read("src/components/shared/Footer.astro");
  assert.match(generator, /Free · takes a minute/);
  assert.match(generator, /No reading required/);
  assert.match(generator, /Do not know your birth time\? An estimate is fine\./);
  assert.match(generator, /Your birth data is used to draw the chart and nothing else\./);
  assert.match(generator, /formView\.hidden = true/);
  assert.match(generator, /resultView\.hidden = false/);
  assert.match(generator, /generatorSection\.scrollIntoView/);
  assert.match(homeCss, /\[data-form-view\]\[hidden\],[\s\S]*\[data-result-view\]\[hidden\][\s\S]*display: none/);
  assert.match(homeCss, /\[data-result-view\] \{[\s\S]*padding: 48px 46px 52px/);
  assert.match(footer, /class="footer-inner"/);
  assert.match(footer, />Privacy<\/a>/);
  assert.match(footer, />Contact<\/a>/);
  assert.match(footer, /Astropages template/);
  assert.doesNotMatch(footer, /Nine centres · one operating manual|Generate chart ↗/);
});

test("Five Types section contains all five human design energy types", () => {
  const typesAstro = read("src/components/home/sections/FiveTypesSection.astro");
  for (const name of ["Manifestor", "Generator", "Manifesting Generator", "Projector", "Reflector"]) {
    assert.equal(typesAstro.includes("TYPES.map"), true);
  }
});

test("Readings section provides one $99 offer and hands payment to Stripe Checkout", () => {
  const readings = read("src/components/home/sections/ThreeReadingsSection.astro");
  const checkout = read("src/pages/api/checkout/full-reading.ts");
  const webhook = read("src/pages/api/checkout/stripe-webhook.ts");
  const orders = read("src/server/capabilities/vendor/astropages-capabilities/human-design-orders.ts");
  assert.equal(readings.includes("One reading, one payment"), true);
  assert.equal(readings.includes("The full reading"), true);
  assert.equal(readings.includes("Unlock everything — $99"), true);
  assert.equal(readings.includes('fetch("/api/checkout/full-reading"'), true);
  assert.equal(readings.includes("You already own this reading"), true);
  assert.equal(readings.includes("/api/checkout/reading-access?reading_id="), true);
  assert.equal(readings.includes("View my full reading →"), true);
  assert.equal(readings.includes("card number"), false);
  assert.equal(checkout.includes("https://api.stripe.com/v1/checkout/sessions"), true);
  assert.equal(checkout.includes('form.set("line_items[0][price_data][unit_amount]", "9900")'), true);
  assert.equal(checkout.includes('resolveSecretBinding(env, "STRIPE_SECRET_KEY")'), true);
  assert.equal(checkout.includes("createHumanDesignOrder"), true);
  assert.equal(checkout.includes("alreadyPurchased: true"), true);
  assert.equal(webhook.includes('resolveSecretBinding(env, "STRIPE_WEBHOOK_SECRET")'), true);
  assert.equal(webhook.includes("verifyStripeSignature"), true);
  assert.equal(webhook.includes("checkout.session.completed"), true);
  assert.equal(orders.includes("RETURNING id, order_number, email, payment_status"), true);
});

test("Bodygraph Canvas SVG geometry is present and rendered", () => {
  const canvasAstro = read("src/components/bodygraph/BodyGraphCanvas.astro");
  assert.equal(canvasAstro.includes("bodygraph-svg"), true);
  assert.equal(canvasAstro.includes("bg-silhouette"), true);
  assert.equal(canvasAstro.includes("bg-channels-active"), true);
  assert.equal(canvasAstro.includes("bg-center-shapes"), true);
  assert.match(canvasAstro, /theme === "cobalt" \? ivoryColor : s\.fill/);
});

test("homepage hero uses the production bodygraph canvas with sample chart data", () => {
  const heroPlate = read("src/components/home/sections/HeroBodygraphPlate.astro");
  assert.match(heroPlate, /UpastroBodyGraphCanvas/);
  assert.match(heroPlate, /chartData=\{sampleChartData\}/);
  assert.match(heroPlate, /showActivationColumns=\{false\}/);
  assert.match(heroPlate, /client:only="react"/);
  assert.doesNotMatch(heroPlate, /import BodyGraphCanvas from/);
});

test("Articles section provides View All CTA and links to blog routes", () => {
  const articlesAstro = read("src/components/home/sections/ArticlesSection.astro");
  assert.equal(articlesAstro.includes('localizePath("/blog", locale)'), true);
  assert.equal(articlesAstro.includes("view-all-cta"), true);
  assert.equal(articlesAstro.includes("localizePath(`/blog/${a.slug}`, locale)"), true);
});

test("Blog index and dynamic slug detail pages exist and render structured articles", () => {
  const blogIndex = read("src/pages/blog.astro");
  const blogDetail = read("src/pages/blog/[slug].astro");
  const blogGrid = read("src/components/blog/BlogArticlesGrid.astro");
  const blogBody = read("src/components/blog/BlogArticleBody.astro");
  const blogData = read("src/data/blog-articles.ts");

  assert.equal(blogIndex.includes("<BlogArticlesGrid"), true);
  assert.equal(blogGrid.includes("<BlogCard"), true);
  assert.equal(blogDetail.includes("<BlogArticleHeader"), true);
  assert.equal(blogDetail.includes("<BlogArticleBody"), true);
  assert.equal(blogBody.includes("takeaways-box"), true);
  assert.equal(blogData.includes("open-centres-not-weaknesses"), true);
  assert.equal(blogData.includes("how-to-test-your-gut-yes"), true);
  assert.doesNotMatch(`${blogIndex}\n${blogDetail}`, /#(?:16100D|241C18|D8F546|E2603D|F0E7DB)/i);
  assert.match(blogIndex, /background: #FFFFFF/);
  assert.match(blogDetail, /background: #FFFFFF/);
});
