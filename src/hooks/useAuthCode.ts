import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSignup } from "./useSignup";

export const useAuthCode = () => {
  const location = useLocation();
  const { signup } = useSignup();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    if (code) {
      localStorage.setItem("authCode", code);
      signup(code, "http://localhost:5173/oauth2/redirected/kakao");
    }
  }, [location.search]);
};
