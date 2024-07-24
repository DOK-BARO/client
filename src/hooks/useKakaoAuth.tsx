import { useState } from "react";
import { getKakaoAuthUrl } from "../services/authService";

export const useKakaoAuth = () => {
  const [loading, setLoading] = useState(false);

  const redirectToKakaoAuth = async () => {
    setLoading(true);
    try {
      const url = await getKakaoAuthUrl();
      console.log(url);
      window.location.href = url; // 해당 url로 이동
    } catch (error) {
      console.error(`권한 부여 URL 가져오기 실패: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { redirectToKakaoAuth, loading };
};
