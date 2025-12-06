"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const [product, setProduct] = useState(null); // ← objet au lieu de []
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          console.log (data);
          setProduct(data.data);
          setMainImage(data.data.image);
        }
      });
  }, [id]);

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-15 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden group">
        {mainImage && (
          <Image
            src={mainImage}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        )}
      </div>

      {/* Product Info */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="transition transform hover:scale-110"
          >
            <Heart
              size={26}
              className={`transition ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            />
          </button>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-indigo-600 text-xl font-semibold mb-6">
          ${product.price}
        </p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Colors</h3>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedColor(color.name);
                    if (color.image) setMainImage(color.image);
                  }}
                  className={`p-1 border-2 rounded-lg cursor-pointer transition ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-transparent hover:border-black"
                  }`}
                >
                  {color.image ? (
                    <Image
                      src={color.image}
                      alt={color.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-md"
                      style={{ backgroundColor: color.hex || "#ccc" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
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
          className="w-full bg-[#162660] text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
