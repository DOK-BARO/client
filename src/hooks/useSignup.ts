import { useState } from "react";
import axios from "axios";

interface UseSignupResponse {
  signup: (token: string, redirectUrl: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useSignup = (): UseSignupResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (token: string, redirectUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      const postData = {
        token: token,
        redirectUrl: "http://localhost:5173/oauth2/redirected/kakao",
      };
      const response = await axios.post("/auth/oauth2/signup/KAKAO", postData);

      console.log("회원가입 완료:", response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`회원가입 실패: ${err.response.status}`);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("회원가입 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
