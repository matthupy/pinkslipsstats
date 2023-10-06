import theme from "./theme-docs";

const siteUrl = "https://pinkslipsstats.com";

const sitemapRoutes = async () => {
  const routes = ["/", "about"];

  const { $content } = require("@nuxt/content");
  const pages = await $content("en", { deep: true })
    .sortBy("position", "asc")
    .only(["slug"])
    .skip(2)
    .fetch();

  for (const page of pages) routes.push(`/episodes/${page.slug}`);

  return routes;
};

export default theme({
  build: {
    transpile: ["defu"],
  },
  docs: {
    primaryColor: "#046A38",
  },
  head: {
    title: "Pink Slips Stats",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Pink Slips Stats",
      },
    ],
    link: [
      { rel: "canonical", href: siteUrl },
      { rel: "alternate", hreflang: "en", href: siteUrl },
    ],
  },
  modules: ["@nuxtjs/robots", "@nuxtjs/sitemap"],
  robots: {
    UserAgent: "*",
    Allow: "/",
    Sitemap: siteUrl + "/sitemap.xml",
  },
  sitemap: {
    hostname: siteUrl,
    gzip: true,
    exclude: ["/releases"],
    routes: sitemapRoutes,
  },
});
