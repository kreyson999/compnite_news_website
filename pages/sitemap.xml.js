import fs from "fs";
import { getPostUrls, getTournamentUrls } from "../services";


const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://kjmm.pl",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync({
      development: "pages",
      production: "./",
    }[process.env.NODE_ENV])
    .filter((staticPage) => {
      return ![
        ".next",
        "___next_launcher.js",
        "___vc_bridge.js",
        "components",
        "helpers",
        "node_modules",
        "package.json",
        "services",
        "styles",
        "_app.js",
        "_document.js",
        "_error.js",
        "404.js",
        "500.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
  });

  const dynamicPostUrls = await getPostUrls()
  const dynamicPostPages = dynamicPostUrls.map(({ node: {slug}}) => ({ slug }));

  const dynamicTournamentUrls = await getTournamentUrls()
  const dynamicTournamentPages = dynamicTournamentUrls.map(({ node: {slug}}) => ({ slug }))

  console.log(dynamicTournamentPages)


  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
      ${dynamicPostPages
        .map(({slug}) => {
          return `
            <url>
              <loc>${baseUrl}/post/${slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join("")}
      ${dynamicTournamentPages
        .map(({slug}) => {
          return `
            <url>
              <loc>${baseUrl}/tournaments/${slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;