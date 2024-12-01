import { authService } from "@/services/server/authService";
import { useState } from "react";

// 이용약관 상세를 불러오는 훅
export const useGetTermDetail = () => {
  const [termDetail, setTermDetail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTermDetail = async (id: number) => {
    setIsLoading(true);
    const response = await authService.fetchTermDetail(id);
    if (response) {
      setTermDetail(response);
      setIsLoading(false);
    }
  };
  return { getTermDetail, termDetail, isLoading };
};
