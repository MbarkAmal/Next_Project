"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Slider from "@/components/Slider";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import { products } from "@/app/data/products";

// 👇 Extract logic that uses useSearchParams into a subcomponent
function HomeContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const allowedTypes = ["trendy", "newcollection"];

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
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Trendy products
        </h2>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </section>
    </>
  );
}

// 👇 Wrap the component that uses useSearchParams in Suspense
export default function Home() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading products...</p>}>
      <HomeContent />
    </Suspense>
  );
}
