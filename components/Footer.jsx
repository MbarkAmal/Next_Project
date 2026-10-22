"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#101c46] text-gray-200 mt-20 border-t border-[#1e327a]">
      {/* 1. Value Proposition / Trust Features Row */}
      <div className="border-b border-[#1b2d6b] bg-[#0c1638]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#162660] text-[#D0E6FD] flex items-center justify-center flex-shrink-0 shadow-inner">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Livraison Rapide</h4>
              <p className="text-xs text-blue-200 mt-0.5">
                24-48h partout en Tunisie, gratuite dès 150 dt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#162660] text-[#D0E6FD] flex items-center justify-center flex-shrink-0 shadow-inner">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Paiement à la Livraison</h4>
              <p className="text-xs text-blue-200 mt-0.5">
                Payez en espèces à la réception de votre colis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#162660] text-[#D0E6FD] flex items-center justify-center flex-shrink-0 shadow-inner">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantie 14 Jours</h4>
              <p className="text-xs text-blue-200 mt-0.5">
                Échange ou remboursement simple et rapide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#162660] text-[#D0E6FD] flex items-center justify-center flex-shrink-0 shadow-inner">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Support Client 7j/7</h4>
              <p className="text-xs text-blue-200 mt-0.5">
                Une équipe dédiée prête à vous aider à tout moment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand presentation (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-white tracking-wider">
                GRINATO
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Grinato est votre boutique en ligne de référence pour la mode tendance,
              les accessoires modernes et les produits de beauté d&apos;exception. Qualité
              irréprochable et satisfaction client au cœur de nos engagements.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-amber-400 flex-shrink-0" />
                <span>Centre Urbain Nord, Tunis, Tunisie</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-amber-400 flex-shrink-0" />
                <span>+216 71 888 999 / +216 55 123 456</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-amber-400 flex-shrink-0" />
                <span>contact@grinato.com</span>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#1b2d6b] hover:bg-[#2542a0] flex items-center justify-center text-white transition hover:scale-110"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#1b2d6b] hover:bg-[#2542a0] flex items-center justify-center text-white transition hover:scale-110"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[#1b2d6b] hover:bg-[#2542a0] flex items-center justify-center text-white transition hover:scale-110"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-3">
              Catégories
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/products?category=homme" className="hover:text-amber-300 transition">
                  Mode Homme
                </Link>
              </li>
              <li>
                <Link href="/products?category=femme" className="hover:text-amber-300 transition">
                  Mode Femme
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-amber-300 transition">
                  Montres & Accessoires
                </Link>
              </li>
              <li>
                <Link href="/products?category=beauty" className="hover:text-amber-300 transition">
                  Soins & Beauté
                </Link>
              </li>
              <li>
                <Link href="/products?type=trendy" className="hover:text-amber-300 transition text-amber-300 font-medium">
                  🔥 Meilleures Ventes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-3">
              Aide & Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/panier" className="hover:text-amber-300 transition">
                  Suivre ma commande
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-300 transition">
                  Guide des tailles
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-300 transition">
                  Frais & délais de livraison
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-300 transition">
                  Politique de retours & échanges
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-amber-300 transition">
                  Espace client
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-3">
              Newsletter
            </h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              Inscrivez-vous pour recevoir nos promotions exclusives et bénéficiez de{" "}
              <strong className="text-amber-300">10% de réduction</strong>.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email..."
                  required
                  className="w-full bg-[#1b2d6b] border border-[#2c449c] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                <span>Rejoindre le Club</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {subscribed && (
              <p className="flex items-center gap-1.5 text-xs text-green-400 mt-2">
                <CheckCircle2 size={14} /> Merci ! Code promo envoyé par email.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-[#1b2d6b] bg-[#0a122e] text-xs text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">Grinato</span>. Tous droits réservés. Conçu pour une expérience d&apos;achat d&apos;exception.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400">Paiement accepté :</span>
            <div className="flex gap-2">
              <span className="bg-[#162660] text-gray-200 border border-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                Espèces à la livraison
              </span>
              <span className="bg-[#162660] text-gray-200 border border-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                Carte Bancaire
              </span>
              <span className="bg-[#162660] text-gray-200 border border-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                Konnect
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
