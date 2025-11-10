"use client"; // REQUIRED when using motion or onClick in Next.js App Router
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <Link href={`/products?category=${category.name}`} className="group">
      <motion.div
        whileHover={{ y: -5, scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer flex flex-col items-center justify-center transition-all p-6 text-center"
      >
        {/* Icon Circle */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-50 text-[#162660] mb-4 group-hover:bg-[#162660] group-hover:text-[#D0E6FD] transition-all duration-300">
          {Icon && <Icon size={40} strokeWidth={1.5} />}
        </div>

        {/* Category Name */}
        <h3 className="text-lg font-semibold text-[#162660]  transition-colors">
          {category.name}
        </h3>

        {/* Category Description */}
        <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
          {category.description}
        </p>
      </motion.div>
    </Link>
  );
}
