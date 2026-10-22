import { getAllProductSlugs } from "@/lib/products";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categories = ["homme", "femme", "accessories", "beauty"];
  const categoryRoutes = categories.map((cat) => ({
    url: `${siteUrl}/products?category=${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  let productRoutes = [];
  try {
    const products = await getAllProductSlugs();
    productRoutes = products.map((p) => ({
      url: `${siteUrl}/products/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch product slugs for sitemap:", error);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
