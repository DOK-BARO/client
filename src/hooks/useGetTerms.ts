import { fetchTerms } from "@/services/server/authService";
import { TermsOfServiceType } from "@/types/TermsOfServiceType";
import { useEffect, useState } from "react";

// 이용약관들을 불러오는 훅
export const useGetTerms = () => {
  const [terms, setTerms] = useState<TermsOfServiceType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTerms = async () => {
    setIsLoading(true);
    const response = await fetchTerms();
    if (response) {
      setTerms(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTerms();
  }, []);

  return { terms, isLoading };
};
