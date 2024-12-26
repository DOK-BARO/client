import { ErrorType } from "@/types/ErrorType";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleQueryError } from "@/utils/errorHandler";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onError: (error: ErrorType) => {
        // toast.error(error.message || "알 수 없는 오류가 발생했습니다.");
        handleQueryError(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error: ErrorType) => {
      handleQueryError(error);
    },
  }),
});
