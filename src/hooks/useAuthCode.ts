import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAuthCode = () => {
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    if (code) {
      localStorage.setItem("authCode", code);
    }
  }, [location.search]);
};
