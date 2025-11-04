import ProductCard from "./ProductCard";
import {products} from "@/app/data/products";


export default function ProductGrid({products = []}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
      {products.map((product) => (
        <ProductCard key={product.id} product ={product} />
      ))}
    </div>
  );
}
