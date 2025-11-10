import React from "react";
import { ShoppingCart } from "lucide-react"; 
import Link from "next/link"
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

  return (
   
    <div 
         className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
{/* image product */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button   onClick={() => addToCart(product)}
           className="flex items-center gap-2 bg-white text-[#162660] font-semibold px-6 py-2 rounded-full hover:bg-[#162660] hover:text-white transition-all duration-300">
            <ShoppingCart size={18}  />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link  href= {`/products/${product.id}`} >
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition">
          {product.name}
        </h3>
       {/* <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description || "High-quality and stylish product."}
        </p> */}
        <p className="text-[#162660] font-bold text-xl">{product.price} dt</p>
      </div>
</Link>
      {/* Decorative gradient bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D0E6FD]  to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </div>
    
  );
}
