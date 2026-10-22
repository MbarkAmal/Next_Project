"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingCart,
  UserRound,
  Heart,
  Search,
  Sparkles,
  Truck,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserDropdown, setIsUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user in localStorage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/signin");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products" },
    { label: "Homme", href: "/products?category=homme" },
    { label: "Femme", href: "/products?category=femme" },
    { label: "Accessories", href: "/products?category=accessories" },
    { label: "Beauty", href: "/products?category=beauty" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Announcement Bar / Pub */}
      <div className="bg-[#162660] text-[#D0E6FD] text-xs py-2 px-4 border-b border-[#223985]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span className="font-medium">
              Offre Spéciale : <strong>-10%</strong> supplémentaire avec le code{" "}
              <span className="bg-amber-400 text-gray-900 px-1.5 py-0.5 rounded font-bold tracking-wider">
                GRINATO10
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs text-blue-200">
            <span className="flex items-center gap-1">
              <Truck size={13} /> Livraison Gratuite dès 150 dt
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} /> Paiement à la livraison
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-[#162660] hover:bg-gray-100 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" aria-label="Grinato Home" className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#162660]">
            GRINATO
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-[#162660]">
            Store
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-lg mx-6 relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fashion, accessories, beauty..."
            className="w-full border border-gray-300 rounded-full pl-5 pr-24 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#162660] focus:border-transparent transition"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 bg-[#162660] text-white px-5 rounded-full hover:bg-[#0f1b46] transition flex items-center gap-1.5 text-sm font-medium cursor-pointer"
          >
            <Search size={15} />
            <span>Search</span>
          </button>
        </form>

        {/* Icons / Actions */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {/* Wishlist Link */}
          <Link
            href="/products"
            aria-label="View products"
            className="hidden sm:flex text-gray-700 hover:text-[#162660] transition p-1.5 rounded-full hover:bg-gray-100"
            title="Browse all products"
          >
            <Heart className="w-5 h-5 text-[#162660]" />
          </Link>

          {/* User Dropdown */}
          {user ? (
            <div
              className="relative"
              onClick={() => setIsUserDropdown(!isUserDropdown)}
            >
              <button
                aria-label="User profile menu"
                className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer text-[#162660]"
              >
                <div className="w-8 h-8 rounded-full bg-[#162660] text-white flex items-center justify-center font-bold text-xs uppercase">
                  {(user.fullName || user.email || "U")[0]}
                </div>
              </button>

              {isUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl z-50 border border-gray-100 py-2 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.fullName || user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition text-sm cursor-pointer font-medium mt-1"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              aria-label="Sign In"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#162660] hover:text-blue-800 transition py-1.5 px-3 rounded-full border border-gray-200 hover:border-[#162660]"
            >
              <UserRound className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Cart Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >
            <Link
              href="/panier"
              className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-6 h-6 text-[#162660]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-900 text-[11px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                  {cartCount}
                </span>
              )}
            </Link>

            <div
              className={`absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-2xl z-50 border border-gray-100 transition-all duration-300 ${
                isCartHovered
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Mon Panier ({cartCount})
                  </h4>
                  <Link
                    href="/panier"
                    className="text-xs text-[#162660] font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>

                {cart.length === 0 ? (
                  <div className="py-6 text-center">
                    <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center py-2.5 gap-3"
                        >
                          <div
                            className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                            style={{ position: "relative" }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs text-gray-800 truncate">
                              {item.name}
                            </p>
                            <p className="text-[#162660] font-bold text-xs mt-0.5">
                              {item.price} dt × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/panier"
                      className="block mt-4 bg-[#162660] hover:bg-[#0f1b46] text-white text-center py-2.5 rounded-xl transition text-sm font-semibold shadow"
                    >
                      Voir le panier / Commander
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Category Sub-Nav */}
      <nav className="hidden md:block border-t border-gray-100 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-8 py-2.5 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#162660] hover:font-semibold transition relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#162660] transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/products?type=trendy"
            className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles size={14} /> Trendy Deals
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#162660]"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-gray-500"
            >
              <Search size={18} />
            </button>
          </form>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-1.5 hover:text-[#162660] border-b border-gray-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products?type=trendy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-600 font-semibold py-1.5 flex items-center gap-1"
            >
              <Sparkles size={14} /> Trendy Deals
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
