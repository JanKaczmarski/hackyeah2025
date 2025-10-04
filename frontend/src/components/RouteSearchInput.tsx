import { useState } from "react";

interface RouteSearchInputProps {
  onSearch: (start: string, destination: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function RouteSearchInput({
  onSearch,
  isOpen,
  onToggle,
}: RouteSearchInputProps) {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (start.trim() && destination.trim()) {
      onSearch(start.trim(), destination.trim());
      onToggle(); // Close the form after search
    }
  };

  return (
    <>
      {/* Search Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg px-4 py-2 hover:bg-neutral-50 transition-colors flex items-center gap-2"
        >
          <svg
            className="h-5 w-5 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="font-medium text-sm text-neutral-700">
            Search route
          </span>
        </button>
      )}
      {/* Search Form */}
      {isOpen && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-3/4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900">
              Plan your route
            </h3>
            <button
              type="button"
              onClick={onToggle}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Starting point
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      strokeWidth="2"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="Enter starting location"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Destination
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-error-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium text-sm"
            >
              Search route
            </button>
          </form>
        </div>
      )}
    </>
  );
}
