import Image from "next/image";
import Link from "next/link";

const items = [
  { src: "/image5.jpg",  tag: "Nouveauté", alt: "Look denim tendance avec veste et jean large",  },
  { src: "/image4.jpg",  tag: "Tendance", alt: "Manteau à motif léopard" },
  { src: "/image1.jpg", tag: "Urbain", alt: "Tenue noire streetwear sur une chaise"},
  { src: "/image6.jpg",  tag: "Best-seller", alt: "Jean large et veste en denim",  },
];

export default function Gallery({ variant = "full" }) {
  if (variant === "compact") {
    return (
      <section aria-labelledby="gallery-heading" className="w-full py-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase">
              Pour compléter votre commande
            </p>
            <h2 id="gallery-heading" className="text-2xl font-extrabold text-[#162660]">
              Vous aimerez aussi
            </h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-[#162660] hover:underline">
            Tout voir →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1">
          {items.map((item) => (
            <Link
              key={item.src}
              href={item.href}
              className="group relative snap-start shrink-0 w-44 sm:w-52 md:w-56"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 shadow-md">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="224px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#162660]">
                  {item.tag}
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="font-bold text-sm">{item.title}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // Variante "full" (page d'accueil) : votre galerie en cartes décalées
  return (
    <section aria-labelledby="gallery-heading" className="relative max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      <div className="relative text-center mb-14">
        <span className="text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase">Lookbook</span>
        <h2 id="gallery-heading" className="mt-2 text-3xl md:text-5xl font-extrabold text-[#162660] uppercase tracking-wide">
          Notre galerie
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#162660]" />
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Découvrez nos looks modernes, nos visuels et notre inspiration mode.
        </p>
      </div>

      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {items.map((item, i) => (
          <figure
            key={item.src}
            className={`group relative rounded-3xl bg-white p-2 md:p-3 shadow-lg shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
              i % 2 === 1 ? "mt-8 md:mt-14" : ""
            }`}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#162660] shadow">
                {item.tag}
              </span>
            </div>
            <figcaption className="flex items-center justify-between px-2 pt-3 pb-1">
              <span className="font-bold text-[#162660] text-sm md:text-base">{item.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}