import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Grinato",
  description: "Sorry, the page or product you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold text-[#162660] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn&apos;t find what you were looking for. The item might have been
        removed or the link is incorrect.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-[#162660] hover:bg-[#0f1b46] text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="border border-[#162660] text-[#162660] hover:bg-[#D0E6FD] font-semibold px-6 py-3 rounded-lg transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
