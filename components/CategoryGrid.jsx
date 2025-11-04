import CategoryCard from "@/components/CategoryCard";

import { Laptop, Shirt, Sofa, Smartphone ,Brush , Gem, Rose} from "lucide-react"; // icon pack

export default function CategoryGrid({ onSelect }) {
  const categories = [
    {id :1, name: "Homme", icon: Shirt , key:"Homme", description:"Explore the latest men's fashion, casual wear, and accessories.",},
    { id :2, name: "Femme", icon: Rose , key:"femme",     description: "Discover chic styles, dresses, and modern outfits for women." },
    {id :3,  name: "Accessory", icon: Gem ,   key:"accessory",   description: "Complete your look with premium watches, bags, and jewelry.", },
    { id :4, name: "Beauty", icon: Brush , key:"beauty",     description: "Enhance your glow with makeup, skincare, and beauty essentials.", },

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
