"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Slider() {
  const slides = [
    {
      image: "/pub6.jpg",
      alt: "Seasonal collection banner highlight",
    },
    {
      image: "/pub.jpg",
      alt: "Exclusive fashion trends and modern style",
    },
    {
      image: "/pub5.jpg",
      alt: "Premium accessories and lifestyle collection",
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
    <section
      aria-label="Promotional banner slider"
      className="relative h-[65vh] w-[90vw] mx-auto mt-6 overflow-hidden rounded-2xl shadow-2xl bg-gray-900"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
          style={{ position: "relative" }}
        >
          <Image
            src={slides[current].image}
            alt={slides[current].alt}
            fill
            priority={current === 0}
            sizes="90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Small dots indicator */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              current === index ? "bg-white scale-125" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
