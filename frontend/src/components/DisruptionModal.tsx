import { useState, useEffect } from "react";
import type { Disruption, Location } from "../types/transport";
import { useAuthStore } from "../stores/authStore";

interface DisruptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (disruption: Omit<Disruption, "rating">) => void;
}

export function DisruptionModal({
  isOpen,
  onClose,
  onSubmit,
}: DisruptionModalProps) {
  const { user } = useAuthStore();
  const [type, setType] = useState("");
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (isOpen) {
      setIsLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setIsLoadingLocation(false);
          },
          (error) => {
            console.error("Error getting location:", error);
            // Default to Warsaw center if location unavailable
            setLocation({ latitude: 52.2297, longitude: 21.0122 });
            setIsLoadingLocation(false);
          }
        );
      } else {
        // Default to Warsaw center if geolocation not supported
        setLocation({ latitude: 52.2297, longitude: 21.0122 });
        setIsLoadingLocation(false);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type.trim() && user) {
      onSubmit({
        type: type.trim(),
        location,
        user: user.username,
      });
      // Reset form
      setType("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">
            Report Disruption
          </h2>
          <button
            type="button"
            onClick={onClose}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Disruption Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              required
            >
              <option value="">Select type...</option>
              <option value="delay">Delay</option>
              <option value="cancellation">Cancellation</option>
              <option value="crowded">Overcrowding</option>
              <option value="accident">Accident</option>
              <option value="construction">Construction Work</option>
              <option value="technical">Technical Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Location
            </label>
            <div className="bg-neutral-50 border border-neutral-300 rounded-md px-3 py-2 text-sm">
              {isLoadingLocation ? (
                <span className="text-neutral-500">Getting location...</span>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-primary-600"
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
                    <span className="text-neutral-700 font-medium">
                      Current Location
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 ml-6">
                    Lat: {location.latitude.toFixed(6)}, Lng:{" "}
                    {location.longitude.toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Reported by
            </label>
            <div className="bg-neutral-50 border border-neutral-300 rounded-md px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-neutral-700 font-medium">
                  {user?.username || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoadingLocation}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
