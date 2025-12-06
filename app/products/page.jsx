"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";

export default function Products() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          category
            ? `/api/products/category/${category}`
            : "/api/products"
        );
        const data = await res.json();
        setFilteredProducts(data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          {category ? `${category} Products` : "All Products"}
        </h1>

        {category && (
          <a href="/products" className="text-sm text-[#162660] hover:underline">
            Clear Filter
          </a>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p className="text-gray-700">
          No products found for category "{category}".
        </p>
      )}
    </section>
  );
}
