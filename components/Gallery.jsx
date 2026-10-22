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
    <section aria-labelledby="gallery-heading" className="max-w-7xl mx-auto px-0 py-8">
      <h2
        id="gallery-heading"
        className="text-4xl font-bold text-[#162660] mb-6 text-center uppercase tracking-wide"
      >
        Our Gallery
      </h2>
      <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
        Discover our modern looks, artistic visuals, and creative inspiration.
      </p>

      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left: Large Image */}
        <div
          className="relative h-[600px] rounded-2xl overflow-hidden group bg-gray-100"
          style={{ position: "relative" }}
        >
          <Image
            src={images[0]}
            alt="Fashion showcase main gallery view"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Right: Smaller stacked images */}
        <div className="grid grid-rows-2 gap-6">
          <div
            className="relative h-[290px] rounded-2xl overflow-hidden group bg-gray-100"
            style={{ position: "relative" }}
          >
            <Image
              src={images[1]}
              alt="Fashion showcase look 2"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            className="relative h-[290px] rounded-2xl overflow-hidden group bg-gray-100"
            style={{ position: "relative" }}
          >
            <Image
              src={images[6]}
              alt="Fashion showcase look 3"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Second section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div
          className="relative h-[400px] rounded-2xl overflow-hidden group bg-gray-100"
          style={{ position: "relative" }}
        >
          <Image
            src={images[5]}
            alt="Fashion collection item 4"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div
          className="relative h-[400px] rounded-2xl overflow-hidden group bg-gray-100"
          style={{ position: "relative" }}
        >
          <Image
            src={images[4]}
            alt="Fashion collection item 5"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div
          className="relative h-[400px] rounded-2xl overflow-hidden group bg-gray-100"
          style={{ position: "relative" }}
        >
          <Image
            src={images[2]}
            alt="Fashion collection item 6"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
