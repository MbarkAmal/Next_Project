"use client";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";

export default function Pannier() {
  const { cart, setCart, removeFromCart } = useCart();

  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // example 10%
  const total = subtotal + tax;


  const allowedTypes = ["trendy", "newcollection"];
  
    // ✅ Corrected: added parentheses after trim()
  
  const filteredProducts = products.filter(
    (p) =>
      allowedTypes.includes(p.type?.toLowerCase().trim()) &&
      (!type || p.type?.toLowerCase().trim() === type.toLowerCase().trim())
  );
  
return (
  <>
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-10">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center sm:text-left">
      Votre Panier
    </h1>

    {/* Main grid: items + summary */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 🛒 Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">
            Votre panier est vide 🛍️
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
            >
              {/* 🖼️ Image */}
              <div className="flex-shrink-0 self-center sm:self-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border border-gray-200"
                />
              </div>

              {/* 🧾 Product Info */}
              <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                  {item.name}
                </h2>

                <div className="mt-2 space-y-1 text-sm sm:text-base text-gray-600">
                  <p>
                    {item.category || "Produit"} ·{" "}
                    <span className="text-gray-800 font-medium">
                      {item.price} dt
                    </span>
                  </p>
                  <p>
                    Couleur :{" "}
                    <span className="text-gray-800 font-medium">
                      {item.colors?.[0]?.name || "Color"}
                    </span>
                  </p>
                  <p>
                    Taille :{" "}
                    <span className="text-gray-800 font-medium">
                      {item.sizes?.[0] || "S"}
                    </span>
                  </p>
                  <p>
                    Total :{" "}
                    <span className="text-gray-800 font-medium">
                      {(item.price * item.quantity).toFixed(2)} dt
                    </span>
                  </p>
                </div>

                {/* 🔢 Quantity + Delete */}
                <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 text-gray-700 hover:text-black text-lg"
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 text-gray-700 hover:text-black text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Supprimer l’article"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 💰 Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md h-fit space-y-4 sticky top-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Résumé
        </h2>
        <div className="flex justify-between text-gray-700">
          <span>Sous-total</span>
          <span className="font-medium">{subtotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Taxes (10%)</span>
          <span className="font-medium">{tax.toFixed(2)} €</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        <button className="w-full bg-[#162660] hover:bg-[#0f1b46] text-white py-3 rounded-lg mt-4 transition">
          Passer à la caisse
        </button>
      </div>
    </div>
  </div>
  {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
        </>
);
}
