import { useQuery } from "@tanstack/react-query";
import { getUserIfAuthenticated } from "../services/server/authService.ts";

export function useQueryCurrentUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserIfAuthenticated,
  });

  return {
    isLoading,
    isLoggedIn: !!data,
    user:data,
    error:error,
  };
}