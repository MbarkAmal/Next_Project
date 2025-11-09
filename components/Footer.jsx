export default function Footer() {
  return (
    <footer className="bg-blue-600 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-white">
            Facebook
          </a>
          <a href="#" className="hover:text-white">
            Instagram
          </a>
          <a href="#" className="hover:text-white">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
