"use client";
import Image from "next/image";

export default function Gallery() {
  const images = [
    "/gallery5.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery.jpg",
     "/gallery4.jpg",
         "/gallery1.jpg",
    "/pub2.jpg",


  ];

  return (
    <main className="max-w-7xl mx-auto px-0 py-0">
      <h1 className="text-4xl font-bold text-[#162660] mb-6 text-center uppercase tracking-wide">
        Our Gallery
      </h1>
      <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
        Discover our modern looks, artistic visuals, and creative inspiration.
      </p>

      {/* === Modern Grid Layout === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left: Large Image */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden group">
          <Image
            src={images[0]}
            alt="Main Gallery Image"
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Right: Smaller stacked images */}
        <div className="grid grid-rows-2 gap-6">
          <div className="relative h-[290px] rounded-2xl overflow-hidden group">
            <Image
              src={images[1]}
              alt="Gallery Image 2"
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative h-[290px] rounded-2xl overflow-hidden group">
            <Image
              src={images[6]}
              alt="Gallery Image 3"
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Optional second section (if you want more images below) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="relative h-[400px] rounded-2xl overflow-hidden group">
          <Image
            src={images[5]}
            alt="Gallery Image 4"
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="relative h-[400px] rounded-2xl overflow-hidden group">
          <Image
            src={images[4]}
            alt="Gallery Image 5"
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="relative h-[400px] rounded-2xl overflow-hidden group">
          <Image
            src={images[2]}
            alt="Gallery Image 6"
            fill
            className="object-scale-down w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </main>
  );
}
