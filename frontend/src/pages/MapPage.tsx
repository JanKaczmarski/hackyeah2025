import { useState } from "react";
import { TransportMap } from "../components/TransportMap";
import { RouteSearchInput } from "../components/RouteSearchInput";
import { DisruptionModal } from "../components/DisruptionModal";
import type { NamedRoute, Disruption } from "../types/transport";

// Hardcoded sample routes for different search queries
const getHardcodedRoute = (start: string, destination: string): NamedRoute => {
  // Example route 1: Pl. Zawiszy -> Centrum (tram)
  if (
    start.toLowerCase().includes("zawiszy") ||
    destination.toLowerCase().includes("centrum")
  ) {
    return {
      edges: [
        {
          from: {
            type: "tram_stop",
            name: "Pl. Zawiszy",
            location: { latitude: 52.2297, longitude: 21.0122 },
          },
          to: {
            type: "tram_stop",
            name: "Muzeum Narodowe",
            location: { latitude: 52.2311, longitude: 21.0243 },
          },
          time: new Date("2025-10-04T10:00:00"),
        },
        {
          from: {
            type: "tram_stop",
            name: "Muzeum Narodowe",
            location: { latitude: 52.2311, longitude: 21.0243 },
          },
          to: {
            type: "tram_stop",
            name: "Nowy Świat",
            location: { latitude: 52.2352, longitude: 21.0194 },
          },
          time: new Date("2025-10-04T10:05:00"),
        },
        {
          from: {
            type: "tram_stop",
            name: "Nowy Świat",
            location: { latitude: 52.2352, longitude: 21.0194 },
          },
          to: {
            type: "tram_stop",
            name: "Centrum",
            location: { latitude: 52.2297, longitude: 21.0122 },
          },
          time: new Date("2025-10-04T10:10:00"),
        },
      ],
      transport: {
        type: "tram",
        id: "10",
      },
    };
  }

  // Example route 2: Generic bus route
  return {
    edges: [
      {
        from: {
          type: "bus_stop",
          name: start,
          location: { latitude: 52.2297, longitude: 21.0122 },
        },
        to: {
          type: "bus_stop",
          name: "Transfer Stop",
          location: { latitude: 52.235, longitude: 21.02 },
        },
        time: new Date("2025-10-04T10:00:00"),
      },
      {
        from: {
          type: "bus_stop",
          name: "Transfer Stop",
          location: { latitude: 52.235, longitude: 21.02 },
        },
        to: {
          type: "bus_stop",
          name: destination,
          location: { latitude: 52.24, longitude: 21.025 },
        },
        time: new Date("2025-10-04T10:15:00"),
      },
    ],
    transport: {
      type: "bus",
      id: "175",
    },
  };
};

export function MapPage() {
  const [currentRoute, setCurrentRoute] = useState<NamedRoute | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDisruptionModalOpen, setIsDisruptionModalOpen] = useState(false);

  const handleSearch = (start: string, destination: string) => {
    // TODO: Replace with actual API call
    // const route = await fetchRoute(start, destination);
    const route = getHardcodedRoute(start, destination);
    setCurrentRoute(route);
  };

  const handleDisruptionSubmit = (disruption: Omit<Disruption, "rating">) => {
    // TODO: Replace with actual API call
    // await submitDisruption(disruption);
    console.log("Disruption reported:", disruption);
  };

  return (
    <div className="h-[calc(100vh-theme(space.16))] bg-neutral-100 relative ">
      <RouteSearchInput
        onSearch={handleSearch}
        isOpen={isSearchOpen}
        onToggle={() => setIsSearchOpen(!isSearchOpen)}
      />

      {/* Add Disruption Button */}
      <button
        onClick={() => setIsDisruptionModalOpen(true)}
        className="absolute bottom-6 right-6 z-[1000] bg-error-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-error-700 active:bg-error-800 transition-colors"
        aria-label="Report disruption"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <DisruptionModal
        isOpen={isDisruptionModalOpen}
        onClose={() => setIsDisruptionModalOpen(false)}
        onSubmit={handleDisruptionSubmit}
      />

      <TransportMap namedRoute={currentRoute || undefined} />
    </div>
  );
}
