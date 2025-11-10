"use client";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/app/data/products";
import { useSearchParams } from "next/navigation";
import Gallery from "@/components/Gallery";
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
              {/*  Image */}
              <div className="flex-shrink-0 self-center sm:self-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border border-gray-200"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                  {item.name}
                </h2>

                <div className="mt-2 space-y-1 text-sm sm:text-base text-gray-600">
                  <p>
                    <span className="text-gray-900 font-medium">
                      {item.price} dt
                    </span>
                  </p>
                  <p>
                    Color :{" "}
                    <span className="text-gray-800 font-medium">
                      {item.colors?.[0]?.name || "Color"}
                    </span>
                  </p>
                  <p>
                    Size :{" "}
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

                {/* Quantity Controls with Conditional Delete */}
<div className="flex items-center justify-between mt-4">
  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
    {/* Minus or Trash depending on quantity */}
    {item.quantity > 1 ? (
      <button
        onClick={() => decreaseQuantity(item.id)}
        className="px-2 text-gray-700 hover:text-black text-lg"
      >
        −
      </button>
    ) : (
      <button
        onClick={() => removeFromCart(item.id)}
        className="px-2 text-gray-400 hover:text-[#162660] transition"
        title="Supprimer l’article"
      >
        <Trash2 size={18} />
      </button>
    )}

    {/* Quantity */}
    <span className="px-3 text-gray-800 font-medium">{item.quantity}</span>

    {/* Plus */}
    <button
      onClick={() => increaseQuantity(item.id)}
      className="px-2 text-gray-700 hover:text-black text-lg"
    >
      +
    </button>
  </div>
</div>

              </div>
            </div>
          ))
        )}
      </div>

      {/*  Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md h-fit space-y-4 sticky top-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Overall
        </h2>
        <div className="flex justify-between text-gray-700">
          <span>Delivery value </span>
          <span className="font-medium">{subtotal.toFixed(2)} dt</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Estimated delivery costs (10%)</span>
          <span className="font-medium">{tax.toFixed(2)} dt</span>
        </div>
        <hr className="my-2 bg-[#162660]" />
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Order total:</span>
          <span>{total.toFixed(2)} dt</span>
        </div>
        <button className="w-full bg-[#162660] hover:bg-[#0f1b46] text-white py-3 rounded-lg mt-4 transition">
          complete my order
        </button>
      </div>
    </div>
  </div>
 {/* gallery section */}
      <Gallery />
        </>
);
}
