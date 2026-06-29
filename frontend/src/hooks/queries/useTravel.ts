import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";
import type { TravelRequest, TravelResponse } from "../../types/api";

// Mutation: Calculate travel route
export function useCalculateRoute() {
    return useMutation({
        mutationFn: (data: TravelRequest) =>
            api.post<TravelResponse>("/travel", data),
    });
}
