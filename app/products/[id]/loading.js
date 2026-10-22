export default function ProductDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
      <div className="w-full h-[500px] bg-gray-200 rounded-xl"></div>
      <div className="space-y-6">
        <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-7 w-24 bg-gray-200 rounded"></div>
        <div className="h-14 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
