// Core Golang data model types

export interface Location {
    latitude: number;
    longitude: number;
}

export interface TransportStop {
    type: string;
    name: string;
    location: Location;
}

export interface Edge {
    from: TransportStop;
    to: TransportStop;
    time: string; // ISO timestamp
}

export interface Route {
    edges: Edge[];
}

// Travel endpoint types
export interface TravelRequest {
    origin: Location;
    destination: Location;
    departureTime: string; // ISO timestamp
}

export interface TravelResponse {
    route: Route;
}
