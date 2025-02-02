import { ErrorType } from "@/types/ErrorType";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleQueryError } from "@/utils/errorHandler";
import { getDefaultStore } from "jotai";
import { skipGlobalErrorHandlingAtom } from "@/store/skipGlobalErrorHandlingAtom";
const store = getDefaultStore(); // Jotai의 전역 store 접근

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onError: (error: ErrorType) => {
        handleQueryError(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error: ErrorType) => {
      if (store.get(skipGlobalErrorHandlingAtom)) {
        // 전역 핸들링 스킵
        return;
      }
      handleQueryError(error);
    },
  }),
});
