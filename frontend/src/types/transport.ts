export interface Rating {
  upvotes: number;
  downvotes: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  username: string;
  hashedPassword: string;
  rating: Rating;
}

export interface Disruption {
  type: string;
  location: Location;
  user: string;
  rating: Rating;
}

export interface TransportStop {
  type: string;
  name: string;
  location: Location;
}

export interface Edge {
  from: TransportStop;
  to: TransportStop;
  time: Date;
}

export interface Route {
  edges: Edge[];
}

export interface Transport {
  type: string;
  id: string;
}

export interface NamedRoute {
  edges: Edge[];
  transport: Transport;
}

export interface Schedule {
  routes: NamedRoute[];
}
