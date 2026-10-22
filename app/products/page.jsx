import Link from "next/link";
import { Sparkles, ArrowRight, SlidersHorizontal, Tag, Truck } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import ProductListTracker from "@/components/ProductListTracker";
import { getProducts } from "@/lib/products";

export const revalidate = 60;

export async function generateMetadata({ searchParams }) {
  const params = searchParams ? await searchParams : {};
  const category = params.category;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (category) {
    const formatted = category.charAt(0).toUpperCase() + category.slice(1);
    return {
      title: `${formatted} Collection | Grinato Store`,
      description: `Découvrez la collection ${formatted.toLowerCase()} chez Grinato. Mode, accessoires et beauté de qualité supérieure.`,
      alternates: {
        canonical: `${siteUrl}/products?category=${encodeURIComponent(category.toLowerCase())}`,
      },
    };
  }

  return {
    title: "Catalogue Produits | Grinato Store",
    description: "Explorez tout le catalogue de vêtements tendance, accessoires et beauté chez Grinato.",
  };
}

const CATEGORY_META = {
  femme: {
    title: "Collection Femme",
    subtitle: "Robes, mailles douces et tenues élégantes conçues pour sublimer votre style au quotidien.",
    badge: "Nouvelle Saison",
    discount: "Jusqu'à -30%",
    bg: "from-pink-900/90 via-purple-900/80 to-[#162660]",
  },
  homme: {
    title: "Collection Homme",
    subtitle: "L'alliance parfaite du confort et de l'élégance contemporaine : sneakers, pulls et prêt-à-porter.",
    badge: "Best-Sellers",
    discount: "Jusqu'à -25%",
    bg: "from-blue-950/90 via-indigo-900/80 to-[#162660]",
  },
  accessories: {
    title: "Montres & Accessoires",
    subtitle: "Sublimez votre tenue avec nos lunettes de créateur, sacs raffinés et montres modernes.",
    badge: "Finitions Premium",
    discount: "Offres Spéciales",
    bg: "from-amber-950/90 via-slate-900/85 to-[#162660]",
  },
  beauty: {
    title: "Beauté & Soins",
    subtitle: "Révélez votre éclat naturel avec nos produits cosmétiques et routines de soin d'exception.",
    badge: "100% Authentique",
    discount: "Cadeau offert",
    bg: "from-rose-950/90 via-fuchsia-950/80 to-[#162660]",
  },
};

export default async function ProductsPage({ searchParams }) {
  const params = searchParams ? await searchParams : {};
  const category = params.category?.toLowerCase() || "";
  const search = params.search || "";
  const sort = params.sort || "newest";
  const type = params.type || "";

  const products = await getProducts({ category, search, sort, type });
  
  // Also fetch recommendation products if results are low so page looks rich
  const recommendedProducts =
    products.length < 4
      ? await getProducts({ limit: 4, sort: "newest" })
      : [];

  const currentMeta = CATEGORY_META[category] || {
    title: search ? `Résultats pour "${search}"` : "Catalogue Officiel",
    subtitle: "Explorez notre sélection complète d'articles haut de gamme au meilleur prix.",
    badge: "Sélection Grinato",
    discount: "Livraison 24/48h",
    bg: "from-[#101b46] via-[#162660] to-[#1e3a8a]",
  };

  const categoriesList = [
    { label: "Tous les produits", slug: "" },
    { label: "Homme", slug: "homme" },
    { label: "Femme", slug: "femme" },
    { label: "Accessoires", slug: "accessories" },
    { label: "Beauté", slug: "beauty" },
  ];

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16">
      <ProductListTracker
        products={products}
        listName={category ? `${category} Products` : "All Products"}
      />

      {/* 1. Promotional Category Hero Banner (Pub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div
          className={`relative rounded-3xl p-8 sm:p-12 text-white bg-gradient-to-r ${currentMeta.bg} overflow-hidden shadow-xl`}
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <Sparkles size={13} />
              <span>{currentMeta.badge}</span>
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="text-white">{currentMeta.discount}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
              {currentMeta.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6">
              {currentMeta.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-100">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Truck size={14} className="text-amber-400" /> Livraison 24-48h partout en Tunisie
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Tag size={14} className="text-amber-400" /> Satisfait ou Remboursé sous 14 jours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Tabs & Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categoriesList.map((cat) => {
              const isActive = category === cat.slug;
              const href = cat.slug ? `/products?category=${cat.slug}` : "/products";
              return (
                <Link
                  key={cat.label}
                  href={href}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#162660] text-white shadow-md shadow-blue-950/20 scale-102"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Product Count & Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
            <span className="text-xs text-gray-500 font-medium">
              <strong className="text-gray-900 font-bold">{products.length}</strong> article{products.length > 1 ? "s" : ""} trouvé{products.length > 1 ? "s" : ""}
            </span>

            {/* Sort Links */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-400 px-2 flex items-center gap-1">
                <SlidersHorizontal size={12} /> Trier:
              </span>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  ...(search ? { search } : {}),
                  sort: "newest",
                }).toString()}`}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  sort === "newest" ? "bg-white text-[#162660] shadow-sm font-bold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Récents
              </Link>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  ...(search ? { search } : {}),
                  sort: "price-low",
                }).toString()}`}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  sort === "price-low" ? "bg-white text-[#162660] shadow-sm font-bold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Prix bas
              </Link>
              <Link
                href={`/products?${new URLSearchParams({
                  ...(category ? { category } : {}),
                  ...(search ? { search } : {}),
                  sort: "price-high",
                }).toString()}`}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  sort === "price-high" ? "bg-white text-[#162660] shadow-sm font-bold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Prix haut
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#162660] flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Nous n&apos;avons trouvé aucun article pour cette sélection. Essayez d&apos;explorer nos autres catégories.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#162660] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1b46] transition shadow"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>

      {/* 4. Recommendation Section (Eliminates empty-looking pages when a category has 2-3 items) */}
      {recommendedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
          <div className="border-t border-gray-200 pt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600">
                  Recommandé pour vous
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Les Incontournables de la Saison
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-semibold text-[#162660] hover:underline flex items-center gap-1"
              >
                <span>Tout voir</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <ProductGrid products={recommendedProducts} />
          </div>
        </section>
      )}

      {/* 5. In-page Promo Banner Strip (Pub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="bg-black/20 text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block mb-2">
              Offre Flash Limitée
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              10% de réduction immédiate sur votre panier
            </h3>
            <p className="text-sm text-white/90 mt-1 max-w-xl">
              Utilisez le code promo <strong className="underline text-amber-200">GRINATO10</strong> lors de la finalisation de votre commande.
            </p>
          </div>

          <Link
            href="/checkout"
            className="bg-white text-gray-950 font-bold px-7 py-3 rounded-full hover:bg-gray-100 transition shadow-lg text-sm whitespace-nowrap cursor-pointer hover:scale-105"
          >
            Profiter de l&apos;offre
          </Link>
        </div>
      </section>
    </div>
  );
}
