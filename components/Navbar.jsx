"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, UserRound, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-[#162660]">Grinato</h1>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#162660] text-white px-4 rounded-r-md hover:bg-[#D0E6FD] hover:text-[#162660] transition">
            Search
          </button>
        </div>

        {/* Icons / Links */}
        <div className="flex items-center space-x-6">
          {/* Cart Dropdown on Hover */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Cart Icon */}
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-[#162660]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#162660] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dropdown Cart */}
            <div
                         className={`absolute left-1/2 -translate-x-1/2 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <div className="p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center mb-3 border-b pb-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item.price} dt × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    <Link
                      href="/panier"
                      className="block mt-4 bg-[#162660] text-white text-center py-2 rounded transition"
                    >
                      Voir le panier
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* User + Favorites */}
          <Link href="/signin">
            <UserRound className="w-6 h-6 text-[#162660]" />
          </Link>
          <Heart className="w-6 h-6 text-[#162660]" />
        </div>
      </div>
    </nav>
  );
}
