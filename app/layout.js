import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grinato | Trendy Fashion, Beauty & Accessories",
    template: "%s | Grinato",
  },
  description:
    "Discover trendy clothing, modern accessories, and premium beauty products at Grinato. Quality essentials and modern lifestyle collections.",
  keywords: [
    "e-commerce",
    "fashion",
    "beauty",
    "accessories",
    "homme",
    "femme",
    "lifestyle",
    "Grinato",
  ],
  authors: [{ name: "Grinato Team" }],
  creator: "Grinato",
  publisher: "Grinato",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Grinato",
    title: "Grinato | Trendy Fashion, Beauty & Accessories",
    description:
      "Discover trendy clothing, modern accessories, and premium beauty products at Grinato.",
    images: [
      {
        url: "/pub6.jpg",
        width: 1200,
        height: 630,
        alt: "Grinato Lifestyle and Fashion Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grinato | Trendy Fashion, Beauty & Accessories",
    description:
      "Discover trendy clothing, modern accessories, and premium beauty products at Grinato.",
    images: ["/pub6.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}
        suppressHydrationWarning
      >
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
