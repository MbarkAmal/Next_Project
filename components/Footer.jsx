export default function Footer() {
  return (
    <footer className="bg-[#162660] text-[#D0E6FD] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Grinato. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-[#D0E6FD]">
            Facebook
          </a>
          <a href="#" className="text-[#D0E6FD]">
            Instagram
          </a>
          <a href="#" className="text-[#D0E6FD]">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
