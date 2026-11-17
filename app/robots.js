export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://grinato.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/panier", "/checkout", "/signin", "/signup"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
