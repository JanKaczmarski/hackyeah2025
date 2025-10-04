import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Route, NamedRoute, Schedule } from "../types/transport";

interface TransportMapProps {
  route?: Route;
  namedRoute?: NamedRoute;
  schedule?: Schedule;
  center?: [number, number];
  zoom?: number;
}

// Component to auto-fit map bounds to route
function FitBounds({ positions }: { positions: LatLngExpression[] }) {
  const map = useMap();

  if (positions.length > 0) {
    const bounds = positions.map((pos) => pos as [number, number]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
}

export function TransportMap({
  route,
  namedRoute,
  schedule,
  center = [52.2297, 21.0122], // Warsaw default
  zoom = 13,
}: TransportMapProps) {
  // Convert route data to polyline positions
  const getRoutePositions = (): LatLngExpression[] => {
    if (namedRoute) {
      return namedRoute.edges.flatMap((edge) => [
        [
          edge.from.location.latitude,
          edge.from.location.longitude,
        ] as LatLngExpression,
        [
          edge.to.location.latitude,
          edge.to.location.longitude,
        ] as LatLngExpression,
      ]);
    }
    if (route) {
      return route.edges.flatMap((edge) => [
        [
          edge.from.location.latitude,
          edge.from.location.longitude,
        ] as LatLngExpression,
        [
          edge.to.location.latitude,
          edge.to.location.longitude,
        ] as LatLngExpression,
      ]);
    }
    return [];
  };

  // Get all stops with unique positions
  const getStops = () => {
    const stops = new Map();

    const addEdgeStops = (edges: typeof route.edges) => {
      edges.forEach((edge) => {
        const fromKey = `${edge.from.location.latitude},${edge.from.location.longitude}`;
        const toKey = `${edge.to.location.latitude},${edge.to.location.longitude}`;

        if (!stops.has(fromKey)) {
          stops.set(fromKey, edge.from);
        }
        if (!stops.has(toKey)) {
          stops.set(toKey, edge.to);
        }
      });
    };

    if (namedRoute) {
      addEdgeStops(namedRoute.edges);
    } else if (route) {
      addEdgeStops(route.edges);
    } else if (schedule) {
      schedule.routes.forEach((r) => addEdgeStops(r.edges));
    }

    return Array.from(stops.values());
  };

  // Get line color based on transport type
  const getLineColor = (type?: string): string => {
    const colors: Record<string, string> = {
      bus: "#DC143C",
      tram: "#FFD700",
      metro: "#080809",
      train: "#228B22",
      default: "#3388ff",
    };
    return colors[type?.toLowerCase() || "default"] || colors.default;
  };

  const positions = getRoutePositions();
  const stops = getStops();

  // Render multiple routes from schedule
  const renderScheduleRoutes = () => {
    if (!schedule) return null;

    return schedule.routes.map((namedRoute, idx) => {
      const routePositions = namedRoute.edges.flatMap((edge) => [
        [
          edge.from.location.latitude,
          edge.from.location.longitude,
        ] as LatLngExpression,
        [
          edge.to.location.latitude,
          edge.to.location.longitude,
        ] as LatLngExpression,
      ]);

      return (
        <Polyline
          key={idx}
          positions={routePositions}
          color={getLineColor(namedRoute.transport.type)}
          weight={4}
          opacity={0.7}
        >
          <Popup>
            <div>
              <strong>
                {namedRoute.transport.type} {namedRoute.transport.id}
              </strong>
            </div>
          </Popup>
        </Polyline>
      );
    });
  };

  // Get all positions for bounds fitting
  const getAllPositions = (): LatLngExpression[] => {
    if (schedule) {
      return schedule.routes.flatMap((r) =>
        r.edges.flatMap((edge) => [
          [
            edge.from.location.latitude,
            edge.from.location.longitude,
          ] as LatLngExpression,
          [
            edge.to.location.latitude,
            edge.to.location.longitude,
          ] as LatLngExpression,
        ])
      );
    }
    return positions;
  };

  const allPositions = getAllPositions();

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className="h-screen transport-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {allPositions.length > 0 && <FitBounds positions={allPositions} />}

      {/* Render single route or named route */}
      {!schedule && positions.length > 0 && (
        <Polyline
          positions={positions}
          color={getLineColor(namedRoute?.transport.type)}
          weight={4}
          opacity={0.7}
        >
          {namedRoute && (
            <Popup>
              <div>
                <strong>
                  {namedRoute.transport.type} {namedRoute.transport.id}
                </strong>
              </div>
            </Popup>
          )}
        </Polyline>
      )}

      {/* Render schedule with multiple routes */}
      {renderScheduleRoutes()}

      {/* Render stop markers */}
      {stops.map((stop, idx) => (
        <Marker
          key={idx}
          position={[stop.location.latitude, stop.location.longitude]}
        >
          <Popup>
            <div>
              <strong>{stop.name}</strong>
              <br />
              <span style={{ fontSize: "0.9em", color: "#666" }}>
                {stop.type}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
