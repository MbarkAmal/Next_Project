export default function ProductsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="h-9 w-48 bg-gray-200 rounded-lg"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-4 space-y-4">
            <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto"></div>
            <div className="h-6 w-1/3 bg-gray-200 rounded mx-auto"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
