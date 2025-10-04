export function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Welcome to NavApp
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Your navigation companion for exploring the city.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-primary-600 mb-2">
              Explore Maps
            </h2>
            <p className="text-neutral-600">
              Discover routes and locations with our interactive map.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-primary-600 mb-2">
              Plan Routes
            </h2>
            <p className="text-neutral-600">
              Find the best path to your destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
