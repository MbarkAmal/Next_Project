import CategoryCard from "@/components/CategoryCard";

export default function CategoryGrid({ onSelect }) {
  const categories = [
    {
      id: 1,
      name: "homme",
      icon: "shirt",
      key: "homme",
      description: "Explore the latest men's fashion, casual wear, and accessories.",
    },
    {
      id: 2,
      name: "femme",
      icon: "rose",
      key: "femme",
      description: "Discover chic styles, dresses, and modern outfits for women.",
    },
    {
      id: 3,
      name: "accessories",
      icon: "gem",
      key: "accessory",
      description: "Complete your look with premium watches, bags, and jewelry.",
    },
    {
      id: 4,
      name: "beauty",
      icon: "brush",
      key: "beauty",
      description: "Enhance your glow with makeup, skincare, and beauty essentials.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
