import Image from "next/image";

const images = [
  { src: "/image5.jpg", alt: "Look denim tendance avec veste et jean large" },
  { src: "/image10.jpg", alt: "Manteau à motif léopard" },
  { src: "/image9.jpg", alt: "Look casual pour tous les jours" },
  { src: "/image7.jpg", alt: "Tenue noire streetwear sur une chaise" },
  { src: "/image6.jpg", alt: "Jean large et veste en denim" },
];

function Photo({ img, sizes, className }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gray-100 group ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export default function GalleryClassic() {
  return (
    <section
      aria-labelledby="gallery-classic-heading"
      className="max-w-7xl mx-auto px-0 py-8"
    >
      <h2
        id="gallery-classic-heading"
        className="text-4xl font-bold text-[#162660] mb-6 text-center uppercase tracking-wide"
      >
        Notre galerie
      </h2>
      <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
        Découvrez nos looks modernes, nos visuels et notre inspiration mode.
      </p>

      {/* Haut : grande photo à gauche, deux photos empilées à droite */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <Photo
          img={images[0]}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-[600px]"
        />
        <div className="grid grid-rows-2 gap-6">
          <Photo
            img={images[1]}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-[290px]"
          />
          <Photo
            img={images[2]}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-[290px]"
          />
        </div>
      </div>

      {/* Bas : deux grandes photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Photo
          img={images[3]}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-[400px]"
        />
        <Photo
          img={images[4]}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-[400px]"
        />
      </div>
    </section>
  );
}