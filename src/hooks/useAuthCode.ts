import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginByKakao, signupByKakao } from "../services/authService.ts";
import { AuthResponse } from "../data/AuthResponse.ts";

export const useAuthCode = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const setToken = (result : AuthResponse) => {
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  };

  const doSignUp = async (code: string) => {
    const result = await signupByKakao(code);
    setToken(result);
    navigate("/");
    localStorage.removeItem("authAction");
  };

  const doLogin = async (code: string) => {
    const result = await loginByKakao(code);
    setToken(result);
    navigate("/");
    localStorage.removeItem("authAction");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      const action:string = localStorage.getItem("authAction")!;
      action === "login" ? doLogin(code) : doSignUp(code);
    }
  }, []);
};
