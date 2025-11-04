"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { products } from "../data/products";

export default function Products() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // ✅ Fix: safer filter (handles capitalization + spacing)
  const filteredProducts = category
    ? products.filter(
        (p) =>
          p.category?.toLowerCase().trim() === category?.toLowerCase().trim()
      )
    : products;

  console.log("URL category:", category);
  console.log("Filtered Products:", filteredProducts);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          {category ? `${category} Products` : "All Products"}
        </h1>

        {category && (
          <a
            href="/products"
            className="text-sm text-indigo-600 hover:underline"
          >
            Clear Filter
          </a>
        )}
      </div>

      {/*  Only show filtered products */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p className="text-gray-500">
          No products found for category "{category}".
        </p>
      )}
    </section>
  );
}
