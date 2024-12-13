import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/data/queryKeys.ts";
import { authService } from "@/services/server/authService";

export function useQueryCurrentUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: userKeys.user(),
    queryFn: authService.getUserIfAuthenticated,
  });

  return {
    isLoading,
    isLoggedIn: !!data,
    user: data,
    error: error,
  };
}
