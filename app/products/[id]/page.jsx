"use client";
import { Heart } from "lucide-react";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "@/app/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
      const { addToCart } = useCart();
  
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
const [isLiked, setIsLiked] = useState(false);

  // ✅ Initialize states
const [selectedColor, setSelectedColor] = useState(null);


 const [mainImage, setMainImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-15 grid grid-cols-1 md:grid-cols-2 gap-12">
<div className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden group">
  <Image
    src={mainImage}
    alt={product.name}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
</div>



      <div>
        <div className="flex items-start justify-between mb-4">
  {/* Product Name */}
  <h1 className="text-lg md:text-xl font-semibold text-gray-800">
    {product.name}
  </h1>

 
      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="transition transform hover:scale-110"
      >
        <Heart
          size={26}
          className={`transition ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-gray-500"
          }`}
        />
      </button>
</div>

<p className="text-gray-600 mb-4">{product.description}</p>

<p className="text-indigo-600 text-xl font-semibold mb-6">
  ${product.price}
</p>

      

        {/* ----- Color selection ----- */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setMainImage(color.image);
                  }}
                  className={`p-1 border-2 rounded-lg cursor-pointer transition ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-transparent hover:border-blaèck"
                  }`}
                >
                  <Image
                    src={color.image}
                    alt={color.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----- Size selection ----- */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-gray-500 text-white border-gray-500"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

     <button
     onClick={() => addToCart(product)}
      className="w-full bg-[#162660] text-white px-6 py-3 rounded-lg font-semibold transition">
  Add to Cart
</button>

      </div>
    </div>
  );
}
