import { useState } from "react";
import { Layout } from "../components/Layout";
import { useCalculateRoute } from "../hooks/queries/useTravel";
import type { Location, TravelResponse } from "../types/api";

export function TravelPage() {
    const calculateRoute = useCalculateRoute();

    const [origin, setOrigin] = useState<Location>({ latitude: 0, longitude: 0 });
    const [destination, setDestination] = useState<Location>({ latitude: 0, longitude: 0 });
    const [departureTime, setDepartureTime] = useState("");
    const [result, setResult] = useState<TravelResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await calculateRoute.mutateAsync({
                origin,
                destination,
                departureTime: departureTime || new Date().toISOString(),
            });
            setResult(response);
        } catch (error) {
            console.error("Failed to calculate route:", error);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-neutral-900 mb-6">
                    Travel Planner
                </h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <h3 className="font-medium text-neutral-900 mb-2">Origin</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Latitude"
                                    value={origin.latitude || ""}
                                    onChange={(e) =>
                                        setOrigin({ ...origin, latitude: parseFloat(e.target.value) || 0 })
                                    }
                                    className="px-3 py-2 border border-neutral-300 rounded-md"
                                    required
                                />
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Longitude"
                                    value={origin.longitude || ""}
                                    onChange={(e) =>
                                        setOrigin({ ...origin, longitude: parseFloat(e.target.value) || 0 })
                                    }
                                    className="px-3 py-2 border border-neutral-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-neutral-900 mb-2">Destination</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Latitude"
                                    value={destination.latitude || ""}
                                    onChange={(e) =>
                                        setDestination({ ...destination, latitude: parseFloat(e.target.value) || 0 })
                                    }
                                    className="px-3 py-2 border border-neutral-300 rounded-md"
                                    required
                                />
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Longitude"
                                    value={destination.longitude || ""}
                                    onChange={(e) =>
                                        setDestination({ ...destination, longitude: parseFloat(e.target.value) || 0 })
                                    }
                                    className="px-3 py-2 border border-neutral-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium text-neutral-900 mb-2">
                                Departure Time (Optional)
                            </label>
                            <input
                                type="datetime-local"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={calculateRoute.isPending}
                            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 font-medium"
                        >
                            {calculateRoute.isPending ? "Calculating..." : "Calculate Route"}
                        </button>
                    </form>
                </div>

                {calculateRoute.isError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                        <p className="text-red-800">Failed to calculate route. Please try again.</p>
                    </div>
                )}

                {result && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Route</h2>
                        <div className="space-y-3">
                            {result.route.edges.map((edge, index) => (
                                <div key={index} className="p-3 bg-neutral-50 rounded-md">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-neutral-900">
                                            {index + 1}. {edge.from.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-600">
                                        From: <span className="font-medium">{edge.from.name}</span>
                                    </p>
                                    <p className="text-sm text-neutral-600">
                                        To: <span className="font-medium">{edge.to.name}</span>
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        {new Date(edge.time).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
