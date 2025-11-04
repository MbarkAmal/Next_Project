"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Slider() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      title: "Discover the Latest Trends",
      description: "Shop the best products from top brands — all in one place.",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
      title: "Exclusive Fashion Deals",
      description: "Get up to 50% off on selected collections.",
      buttonText: "Explore",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1400&q=80",
      title: "Style That Speaks",
      description: "Refresh your wardrobe with new season arrivals.",
      buttonText: "View Collection",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[65vh] w-[90vw] mx-auto mt-10 overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
         
          exit={{ opacity:10 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {slides[current].title}
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-8 max-w-2xl opacity-90"
            >
              {slides[current].description}
            </motion.p>

            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              {slides[current].buttonText}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Small dots indicator */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
