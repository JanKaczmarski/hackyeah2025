import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

// Types
interface Route {
  id: string;
  name: string;
  distance: number;
  duration: number;
  status: "active" | "saved";
}

interface CreateRouteData {
  name: string;
  startPoint: { lat: number; lng: number };
  endPoint: { lat: number; lng: number };
}

// Query keys
export const routeKeys = {
  all: ["routes"] as const,
  detail: (id: string) => ["routes", id] as const,
};

// Query: Fetch all routes
export function useRoutes() {
  return useQuery({
    queryKey: routeKeys.all,
    queryFn: () => api.get<Route[]>("/routes"),
  });
}

// Query: Fetch single route
export function useRoute(id: string) {
  return useQuery({
    queryKey: routeKeys.detail(id),
    queryFn: () => api.get<Route>(`/routes/${id}`),
    enabled: !!id, // Only run if id exists
  });
}

// Mutation: Create route
export function useCreateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteData) => api.post<Route>("/routes", data),
    onSuccess: () => {
      // Invalidate and refetch routes list
      queryClient.invalidateQueries({ queryKey: routeKeys.all });
    },
  });
}

// Mutation: Delete route
export function useDeleteRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/routes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routeKeys.all });
    },
  });
}

// Mutation: Update route
export function useUpdateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Route> }) =>
      api.patch<Route>(`/routes/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: routeKeys.all });
      queryClient.invalidateQueries({ queryKey: routeKeys.detail(variables.id) });
    },
  });
}
