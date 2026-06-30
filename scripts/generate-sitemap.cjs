const fs = require("fs");
const path = require("path");

const siteUrl = (
  process.env.VITE_SITE_URL || "https://riva-dtf-enterprise.onrender.com"
)
  .replace(/\/$/, "");

const routes = [
  { path: "/", priority: "1.0" },
  { path: "/price-listing-best", priority: "0.9" },
  { path: "/contact", priority: "0.9" },
  { path: "/about", priority: "0.7" },
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.join(__dirname, "..", "public");

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

console.log(`SEO files generated for ${siteUrl}`);
