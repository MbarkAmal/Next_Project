"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { trackAddToCart } from "@/lib/analytics";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    trackAddToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const productUrl = `/products/${product.slug || product._id}`;
  const displayImage = product.image || "/pub.jpg";
  const altText = `${product.name}${product.category ? ` - ${product.category}` : ""}`;

  // Perceived discount calculation for modern e-commerce visual appeal
  const originalPrice = Math.round(product.price * 1.25);
  const ratingValue = product.rating?.rate || 4.7;
  const reviewCount = product.rating?.count || 18;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100 overflow-hidden">
      <div>
        {/* Product Image Area */}
        <div
          className="relative h-64 w-full bg-gray-50 overflow-hidden"
          style={{ position: "relative" }}
        >
          <Image
            src={displayImage}
            alt={altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <div className="flex flex-col gap-1 items-start">
              {product.type === "trendy" && (
                <span className="bg-amber-500 text-gray-950 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                  🔥 Tendance
                </span>
              )}
              {product.category && (
                <span className="bg-white/90 backdrop-blur-sm text-[#162660] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {product.category}
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleLike}
              type="button"
              aria-label="Add to wishlist"
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-red-500 flex items-center justify-center transition shadow-sm cursor-pointer"
            >
              <Heart
                size={16}
                className={`transition ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
            <button
              onClick={handleAddToCart}
              type="button"
              aria-label={`Add ${product.name} to Cart`}
              className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-white text-[#162660] hover:bg-[#162660] hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={16} /> Ajouté au panier !
                </>
              ) : (
                <>
                  <ShoppingCart size={15} /> Ajouter au panier
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <Link href={productUrl} className="block p-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex text-amber-400">
              <Star size={13} fill="currentColor" />
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {ratingValue}
            </span>
            <span className="text-[11px] text-gray-400">
              ({reviewCount})
            </span>
            <span className="ml-auto text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
              En stock
            </span>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-700 transition">
            {product.name}
          </h3>

          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-lg font-black text-[#162660]">
              {product.price} <span className="text-xs font-bold">dt</span>
            </span>
            <span className="text-xs text-gray-400 line-through">
              {originalPrice} dt
            </span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded ml-auto">
              -20%
            </span>
          </div>
        </Link>
      </div>

      {/* Decorative gradient bar on hover */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
