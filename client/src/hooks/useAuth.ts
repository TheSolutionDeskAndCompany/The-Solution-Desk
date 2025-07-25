import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, isSuccess } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const response = await fetch("/api/auth/user", {
        credentials: "include",
      });
      
      if (response.status === 401) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  // Only show loading if we haven't gotten a successful response yet
  const shouldShowLoading = isLoading && !isSuccess;

  return {
    user: user || null,
    isLoading: shouldShowLoading,
    isAuthenticated: !!user,
  };
}
