"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/signup" || pathname === "/signin";

  return (
    <html lang="en">
      <body>
       {/* //page can all call useCart() to read/update the cart.*/} 
        <CartProvider>  
          {!hideLayout && <Navbar />}
          {children}
          {!hideLayout && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}
