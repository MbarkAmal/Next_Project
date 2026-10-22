import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getProductByIdOrSlug, getProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductGrid from "@/components/ProductGrid";
import JsonLd from "@/components/JsonLd";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product) {
    return {
      title: "Product Not Found | Grinato",
      description: "The requested product does not exist.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/products/${product.slug || product._id}`;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${siteUrl}${product.image}`;

  return {
    title: `${product.name} | Grinato Store`,
    description: product.description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Grinato Store`,
      description: product.description.slice(0, 160),
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Grinato Store`,
      description: product.description.slice(0, 160),
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/products/${product.slug || product._id}`;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${siteUrl}${product.image}`;

  const categoryName = product.category || "Accessories";
  const capitalizedCategory =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  // Fetch related products in the same category
  const categoryProducts = await getProducts({
    category: product.category,
    limit: 6,
  });
  const relatedProducts = categoryProducts
    .filter((p) => String(p._id) !== String(product._id))
    .slice(0, 4);

  // 1. JSON-LD Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description: product.description,
    sku: product.sku || `GRN-${product._id}`,
    brand: {
      "@type": "Brand",
      name: product.brand || "Grinato",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "TND",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(product.rating && product.rating.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.rate,
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };

  // 2. JSON-LD BreadcrumbList Schema
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: capitalizedCategory,
        item: `${siteUrl}/products?category=${encodeURIComponent(
          product.category.toLowerCase()
        )}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="bg-gray-50/40 min-h-screen pb-16">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbsJsonLd} />

      {/* Semantic Breadcrumbs navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-6 pt-6 text-xs text-gray-500"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-[#162660] transition font-medium">
              Accueil
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-gray-400" />
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-[#162660] transition font-medium"
            >
              Catalogue
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-gray-400" />
          </li>
          <li>
            <Link
              href={`/products?category=${encodeURIComponent(
                product.category.toLowerCase()
              )}`}
              className="hover:text-[#162660] transition font-medium capitalize"
            >
              {capitalizedCategory}
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-gray-400" />
          </li>
          <li
            className="text-gray-900 font-semibold truncate max-w-xs"
            aria-current="page"
          >
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product Detail Interactive Component */}
      <ProductDetailClient product={product} />

      {/* Related Products Section ("Vous aimerez aussi") */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pt-16">
          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600">
                  Découvrez également
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  Produits similaires en {capitalizedCategory}
                </h2>
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(
                  product.category.toLowerCase()
                )}`}
                className="text-sm font-semibold text-[#162660] hover:underline flex items-center gap-1"
              >
                <span>Voir toute la catégorie</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </div>
  );
}
