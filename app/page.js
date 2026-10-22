import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
} from "lucide-react";
import Slider from "@/components/Slider";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { getProducts } from "@/lib/products";

export const revalidate = 60; // ISR cache revalidation

export default async function Home({ searchParams }) {
  const params = searchParams ? await searchParams : {};
  const type = params.type;

  const allProducts = await getProducts({ limit: 50 });
  const allowedTypes = ["trendy", "newcollection"];

  const filteredProducts = allProducts.filter((p) => {
    const productType = (p.type || "").toLowerCase().trim();
    const isAllowed = allowedTypes.includes(productType);
    if (!type) return isAllowed || p.category;
    return productType === type.toLowerCase().trim();
  });

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : allProducts.slice(0, 8);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Grinato",
        url: siteUrl,
        logo: `${siteUrl}/pub6.jpg`,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Grinato",
        description:
          "Discover trendy fashion, modern accessories, and premium beauty collections at Grinato.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <h1 className="sr-only">
        Grinato Online Store - Trendy Fashion, Modern Accessories and Beauty Essentials
      </h1>

      {/* Hero Slider */}
      <Slider />

      {/* Trust & Features Strip */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#162660] flex items-center justify-center flex-shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Livraison 24/48h</h4>
              <p className="text-[11px] text-gray-500">Gratuite dès 150 dt</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#162660] flex items-center justify-center flex-shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Paiement à la réception</h4>
              <p className="text-[11px] text-gray-500">Espèces ou carte bancaire</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#162660] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Garantie 14 Jours</h4>
              <p className="text-[11px] text-gray-500">Retours & échanges faciles</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#162660] flex items-center justify-center flex-shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Service Client 7j/7</h4>
              <p className="text-[11px] text-gray-500">Assistance rapide par WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-5">
        {/* Category Exploration */}
        <div className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Explorez par univers
            </span>
            <h2 className="text-3xl font-black text-[#162660] mt-1">
              Nos Catégories Phares
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Trouvez rapidement votre bonheur parmi nos sélections pour hommes, femmes, beauté et accessoires.
            </p>
          </div>
          <CategoryGrid />
        </div>

        {/* High-Impact Promotional Pub Banner */}
        <div className="my-10 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#101c46] via-[#162660] to-blue-900 text-white p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={14} /> Vente Flash de Saison
              </div>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                Jusqu&apos;à <span className="text-amber-400">-40%</span> sur les collections tendances
              </h3>
              <p className="text-sm text-blue-100 mt-2">
                Offre valable dans la limite des stocks disponibles. Utilisez le code promo{" "}
                <span className="font-bold text-amber-300 underline">GRINATO10</span> pour 10% de réduction en plus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products?type=trendy"
                className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold px-7 py-3.5 rounded-full transition shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <Zap size={16} className="fill-gray-950" />
                <span>Profiter des offres</span>
              </Link>
              <Link
                href="/products"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full transition text-sm flex items-center justify-center gap-2 border border-white/20"
              >
                <span>Catalogue complet</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery section */}
        <Gallery />

        {/* Featured / Trendy Products Section */}
        <div className="pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-600 text-xs font-extrabold uppercase tracking-wider">
                <Flame size={15} /> Les Plus Demandés
              </div>
              <h2 className="text-3xl font-black text-[#162660] mt-1">
                Produits Tendances & Nouveautés
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Nos articles les plus appréciés par la communauté Grinato.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  !type
                    ? "bg-[#162660] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tous
              </Link>
              <Link
                href="/?type=trendy"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  type === "trendy"
                    ? "bg-[#162660] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🔥 Trendy
              </Link>
              <Link
                href="/?type=newcollection"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  type === "newcollection"
                    ? "bg-[#162660] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ✨ New Collection
              </Link>
            </div>
          </div>

          {/* Show filtered products */}
          {displayProducts.length > 0 ? (
            <ProductGrid products={displayProducts} />
          ) : (
            <p className="text-gray-500 py-8 text-center">
              Aucun produit trouvé pour ce filtre.
            </p>
          )}

          {/* Bottom Explore Catalog CTA */}
          <div className="text-center pt-12 pb-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#162660] hover:bg-[#0f1b46] text-white font-bold px-8 py-4 rounded-full text-sm shadow-xl hover:shadow-2xl transition hover:scale-105 cursor-pointer"
            >
              <span>Découvrir toute la boutique</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
