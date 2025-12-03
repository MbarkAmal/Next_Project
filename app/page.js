"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Slider from "@/components/Slider";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import { products } from "@/app/data/products";
import Gallery from "@/components/Gallery";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();
const type = searchParams.get("type") ;

const allowedTypes = ["trendy", "newcollection"];

  //  Corrected: added parentheses after trim()

const filteredProducts = products.filter(
  (p) =>
    allowedTypes.includes(p.type?.toLowerCase().trim()) &&
    (!type || p.type?.toLowerCase().trim() === type.toLowerCase().trim())
);

  return (
    <>
      <Slider />
      <section className="max-w-7xl mx-auto px-6 py-5">
        <CategoryGrid onSelect={setSelectedCategory} />

      
      {/* gallery section */}
      <Gallery />
      
              <h2 className=" py-10 text-3xl font-bold mb-10 text-[#162660]">
          Trendy products 
        </h2>

        {/*  Show filtered products when available */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </section>
    </>
  );
}