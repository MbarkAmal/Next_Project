"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import Gallery from "@/components/Gallery";
import { trackBeginCheckout } from "@/lib/analytics";

export default function CartClient() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10%
  const total = subtotal + tax;

  const handleCheckoutClick = () => {
    trackBeginCheckout(cart, total);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center sm:text-left">
          Votre Panier
        </h1>

        {/* Main grid: items + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-gray-500 text-lg mb-6">
                  Votre panier est vide 🛍️
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-[#162660] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0f1b46] transition"
                >
                  Découvrir nos produits
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 self-center sm:self-start bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={item.image || "/pub.jpg"}
                      alt={`${item.name}${item.selectedColor ? ` - ${item.selectedColor}` : ""}`}
                      fill
                      sizes="144px"
                      className="object-cover"
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
                          {item.selectedColor || item.colors?.[0]?.name || "Default"}
                        </span>
                      </p>
                      <p>
                        Size :{" "}
                        <span className="text-gray-800 font-medium">
                          {item.selectedSize || item.sizes?.[0] || "Standard"}
                        </span>
                      </p>
                      <p>
                        Total :{" "}
                        <span className="text-gray-800 font-medium">
                          {(item.price * item.quantity).toFixed(2)} dt
                        </span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                        {item.quantity > 1 ? (
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item._id)}
                            className="px-2 text-gray-700 hover:text-black text-lg cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeFromCart(item._id)}
                            className="px-2 text-gray-400 hover:text-[#162660] transition cursor-pointer"
                            title="Supprimer l'article"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}

                        <span className="px-3 text-gray-800 font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item._id)}
                          className="px-2 text-gray-700 hover:text-black text-lg cursor-pointer"
                          aria-label="Increase quantity"
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

          {/* Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit space-y-4 sticky top-24">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Overall
            </h2>
            <div className="flex justify-between text-gray-700">
              <span>Delivery value</span>
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
            {cart.length > 0 ? (
              <Link href="/checkout" onClick={handleCheckoutClick}>
                <button
                  type="button"
                  className="w-full bg-[#162660] hover:bg-[#0f1b46] text-white py-3 rounded-lg mt-4 transition font-semibold cursor-pointer"
                >
                  Complete my order
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg mt-4 cursor-not-allowed font-semibold"
              >
                Panier vide
              </button>
            )}
          </div>
        </div>
      </div>

      <Gallery />
    </>
  );
}
