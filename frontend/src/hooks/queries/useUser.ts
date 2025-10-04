import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

// Types
interface User {
  id: number;
  username: string;
}

interface UpdateUserData {
  username?: string;
}

// Query keys
export const userKeys = {
  current: ["user", "current"] as const,
  profile: (id: number) => ["user", id] as const,
};

// Query: Fetch current user
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.current,
    queryFn: () => api.get<User>("/me"),
  });
}

// Query: Fetch user by ID
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.profile(id),
    queryFn: () => api.get<User>(`/user/${id}`),
    enabled: !!id,
  });
}

// Mutation: Update current user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) => api.patch<User>("/me", data),
    onSuccess: (updatedUser) => {
      // Update cache with new user data
      queryClient.setQueryData(userKeys.current, updatedUser);
    },
  });
}
