"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Slider() {
  const slides = [
    {
      image:"pub6.jpg",
     
    },
    {
      image:"/pub.jpg",
     // title: "Exclusive Fashion Deals",
      //description: "Get up to 50% off on selected collections.",
      //buttonText: "Explore",
    },
    {
      image:"/pub5.jpg",
     // title: "Style That Speaks",

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
          <div className="absolute inset-0" />

         
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
