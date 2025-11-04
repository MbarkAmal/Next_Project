"use client"
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from"next/navigation";

export default function RootLayout({ children }) {

  const pathname = usePathname();
  //hide navbar from signup page
  const hideLayout =
   pathname === "/signup"|| pathname ==="/signin" ;
  return (
    <html lang="en">
      <body>
        { !hideLayout && <Navbar/>}
        {children}
       {!hideLayout && <Footer/> }
      </body>
    </html>
  );
}
