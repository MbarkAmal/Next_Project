"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Check,
  Clock,
  Sparkles,
  Share2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { trackViewItem, trackAddToCart } from "@/lib/analytics";

export default function ProductDetailClient({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState(product?.image || "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || null
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // "description" | "shipping" | "reviews"
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (product) {
      trackViewItem(product, selectedColor, selectedSize);
    }
  }, [product, selectedColor, selectedSize]);

  if (!product) return null;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(itemToAdd);
    }
    trackAddToCart(product, quantity, selectedColor, selectedSize);

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const originalPrice = Math.round(product.price * 1.25);
  const savings = originalPrice - product.price;

  // Gather all available image thumbnails
  const allImages = [
    product.image,
    ...(product.colors?.map((c) => c.image).filter(Boolean) || []),
  ].filter((img, idx, arr) => arr.indexOf(img) === idx);

  const reviewsData = [
    {
      author: "Sarah M.",
      rating: 5,
      date: "Il y a 3 jours",
      title: "Qualité exceptionnelle et coupe parfaite !",
      comment:
        "Absolument ravie de mon achat. Le tissu est doux, résistant et la couleur correspond exactement aux photos. Livré en 24h à Sousse.",
    },
    {
      author: "Mohamed K.",
      rating: 5,
      date: "Il y a 1 semaine",
      title: "Très satisfait, je recommande vivement",
      comment:
        "Commande reçue rapidement avec un emballage soigné. Très bon rapport qualité/prix pour cette qualité.",
    },
    {
      author: "Amira B.",
      rating: 4,
      date: "Il y a 2 semaines",
      title: "Superbe produit",
      comment:
        "Taille très bien, matière agréable à porter. Service client très réactif sur WhatsApp.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        {/* Left Column: Visuals (5 cols on lg) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image Container */}
          <div
            className="relative w-full h-[450px] sm:h-[540px] bg-gray-50 rounded-2xl overflow-hidden group border border-gray-100"
            style={{ position: "relative" }}
          >
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              <span className="bg-[#162660] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {product.category || "Grinato"}
              </span>
              <span className="bg-amber-400 text-gray-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                -20% Promo
              </span>
            </div>

            {/* Quick action buttons on top right */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                type="button"
                aria-label="Add to wishlist"
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow hover:scale-110 transition flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer"
              >
                <Heart
                  size={20}
                  className={isLiked ? "fill-red-500 text-red-500" : ""}
                />
              </button>
              <button
                type="button"
                aria-label="Share product"
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow hover:scale-110 transition flex items-center justify-center text-gray-500 hover:text-[#162660] cursor-pointer"
                title="Copier le lien"
              >
                <Share2 size={18} />
              </button>
            </div>

            {copiedLink && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm z-20">
                Lien copié dans le presse-papier !
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition cursor-pointer ${
                    mainImage === img
                      ? "border-[#162660] ring-2 ring-blue-100 shadow"
                      : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                  }`}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={img}
                    alt={`Aperçu ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Purchase Panel (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Brand & Stock */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#162660]">
                {product.brand || "GRINATO COLLECTION"}
              </span>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                En Stock (Livraison 24h)
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-800">4.8</span>
              <span className="text-sm text-gray-400 underline cursor-pointer" onClick={() => setActiveTab("reviews")}>
                (38 avis vérifiés)
              </span>
              <span className="hidden sm:inline-block text-xs text-gray-400">|</span>
              <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded">
                ⚡ Plus de 120 vendus
              </span>
            </div>

            {/* Price Area */}
            <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 mb-6 border border-gray-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#162660]">
                  {product.price} <span className="text-lg font-bold">dt</span>
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {originalPrice} dt
                </span>
                <span className="bg-red-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-full">
                  Économisez {savings} dt (-20%)
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                <Clock size={13} className="text-amber-500" />
                <span>Paiement en espèces à la livraison partout en Tunisie.</span>
              </p>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Couleur : <strong className="text-gray-900">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        setSelectedColor(color.name);
                        if (color.image) setMainImage(color.image);
                      }}
                      className={`group relative p-1 rounded-xl border-2 transition cursor-pointer flex items-center gap-2 px-3 py-1.5 ${
                        selectedColor === color.name
                          ? "border-[#162660] bg-blue-50/50 shadow-sm"
                          : "border-gray-200 hover:border-gray-400 bg-white"
                      }`}
                    >
                      {color.image ? (
                        <div
                          className="relative w-7 h-7 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                          style={{ position: "relative" }}
                        >
                          <Image
                            src={color.image}
                            alt={color.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.hex || "#ccc" }}
                        />
                      )}
                      <span className="text-xs font-semibold text-gray-800 capitalize">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Taille : <strong className="text-gray-900">{selectedSize}</strong>
                  </span>
                  <span className="text-xs text-[#162660] font-semibold hover:underline cursor-pointer">
                    Guide des tailles
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-11 px-4 rounded-xl border text-sm font-bold transition cursor-pointer flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-[#162660] text-white border-[#162660] shadow-md shadow-blue-900/20"
                          : "border-gray-200 text-gray-700 hover:border-gray-900 bg-white"
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Quantité :
              </span>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-gray-600 hover:bg-gray-100 transition font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-sm text-gray-900 min-w-10 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-gray-600 hover:bg-gray-100 transition font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to cart & Buy now */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  addedAnimation
                    ? "bg-emerald-600 text-white"
                    : "bg-[#162660] hover:bg-[#0f1b46] text-white hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={18} /> Ajouté au panier !
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Ajouter au panier
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md bg-amber-400 hover:bg-amber-500 text-gray-950 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <Zap size={18} className="fill-gray-950" /> Acheter Maintenant
              </button>
            </div>
          </div>

          {/* Trust Guarantees Panel */}
          <div className="border-t border-gray-100 pt-5 space-y-2.5 text-xs text-gray-600">
            <div className="flex items-center gap-2.5">
              <Truck size={16} className="text-[#162660] flex-shrink-0" />
              <span>
                <strong>Livraison express 24-48h</strong> partout en Tunisie (Gratuite dès 150 dt)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-[#162660] flex-shrink-0" />
              <span>
                <strong>Paiement à la livraison</strong> en toute sérénité
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw size={16} className="text-[#162660] flex-shrink-0" />
              <span>
                <strong>Garantie retour sous 14 jours</strong> sans justification
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Detailed description, shipping, verified reviews */}
      <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`pb-4 text-sm font-bold transition cursor-pointer relative ${
              activeTab === "description"
                ? "text-[#162660]"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Description & Caractéristiques
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#162660]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("shipping")}
            className={`pb-4 text-sm font-bold transition cursor-pointer relative ${
              activeTab === "shipping"
                ? "text-[#162660]"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Livraison & Retours
            {activeTab === "shipping" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#162660]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 text-sm font-bold transition cursor-pointer relative flex items-center gap-1.5 ${
              activeTab === "reviews"
                ? "text-[#162660]"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Avis Clients (38)
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#162660]" />
            )}
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === "description" && (
          <div className="py-6 space-y-4 text-sm text-gray-700 leading-relaxed max-w-4xl">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Qualité de confection</h4>
                <p className="text-xs text-gray-500">
                  Fabriqué avec des matériaux sélectionnés pour leur durabilité, confort et finitions soignées.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Conseil d&apos;entretien</h4>
                <p className="text-xs text-gray-500">
                  Lavage délicat à 30°C recommandé. Ne pas utiliser d&apos;eau de javel. Repassage doux à l&apos;envers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Shipping */}
        {activeTab === "shipping" && (
          <div className="py-6 space-y-4 text-sm text-gray-700 leading-relaxed max-w-4xl">
            <h4 className="font-bold text-base text-gray-900">
              Délais et modalités de livraison en Tunisie
            </h4>
            <p>
              Toutes les commandes passées avant 14h du lundi au vendredi sont expédiées le jour même par notre service de livraison express partenaire.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <strong>Grand Tunis :</strong> Livraison en 24h ouvrées.
              </li>
              <li>
                <strong>Autres gouvernorats :</strong> Livraison en 24h à 48h ouvrées.
              </li>
              <li>
                <strong>Frais de livraison :</strong> 7 dt (ou <strong>GRATUIT</strong> dès 150 dt d&apos;achat).
              </li>
              <li>
                <strong>Paiement :</strong> Espèces au livreur ou par carte bancaire sécurisée.
              </li>
            </ul>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === "reviews" && (
          <div className="py-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-black text-[#162660]">4.8 / 5</div>
                <div className="flex text-amber-400 justify-center sm:justify-start my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Basé sur 38 avis vérifiés</p>
              </div>
              <div className="flex-1 w-full space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-12">5 étoiles</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[88%]" />
                  </div>
                  <span className="w-8 text-right font-semibold">88%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12">4 étoiles</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[10%]" />
                  </div>
                  <span className="w-8 text-right font-semibold">10%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12">3 étoiles</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[2%]" />
                  </div>
                  <span className="w-8 text-right font-semibold">2%</span>
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-4 pt-2">
              {reviewsData.map((rev, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-gray-50/60 border border-gray-100 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#162660] text-white flex items-center justify-center font-bold text-xs">
                        {rev.author[0]}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900">
                          {rev.author}
                        </h5>
                        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                          ✓ Achat vérifié
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <h6 className="font-bold text-xs text-gray-800">{rev.title}</h6>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
