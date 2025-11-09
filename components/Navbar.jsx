"use client";
import Link from "next/link";

import { ShoppingCart ,UserRound , Heart , } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href='/'>
        <h1 className="text-2xl font-bold text-blue-600">Grinato</h1>
        </Link>
        {/* Search Bar */}
        <div className="hidden md:flex w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Icons / Links */}
        <div className="flex items-center space-x-6">
          <button className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <Link href="/signin">
           <UserRound  className="w-6 h-6 text-gray-700" />
           </Link>
           <Heart  className="w-6 h-6 text-gray-700" />

 
        </div>
      </div>
    </nav>
  );
}
