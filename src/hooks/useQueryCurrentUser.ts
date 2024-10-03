import { useQuery } from "@tanstack/react-query";
import { getUserIfAuthenticated } from "@/services/server/authService.ts";
import { userKeys } from "@/data/queryKeys.ts";

export function useQueryCurrentUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: userKeys.user(),
    queryFn: getUserIfAuthenticated,
  });

  return {
    isLoading,
    isLoggedIn: !!data,
    user: data,
    error: error,
  };
}
