import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      console.log("Fetching auth user...");
      const response = await fetch("/api/auth/user", {
        credentials: "include",
      });
      
      console.log("Auth response status:", response.status);
      
      if (response.status === 401) {
        console.log("User not authenticated");
        return null;
      }
      
      if (!response.ok) {
        console.error("Auth fetch failed:", response.statusText);
        return null;
      }
      
      const userData = await response.json();
      console.log("User authenticated:", userData.email);
      return userData;
    },
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  console.log("useAuth state:", { user: !!user, isLoading, hasError: !!error });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
