import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup, login } from "../services/authService.ts";
import { AuthResponse } from "../types/AuthResponse.ts";
import {
  AUTH_ACTION,
  LOCAL_STORAGE_KEY,
  URL_PARAMS_KEY,
} from "../data/constants.ts";
import { SocialLoginType } from "../types/SocialLoginType.ts";

export const useAuthCode = (provider: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  const setToken = (result: AuthResponse) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, result.accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, result.refreshToken);
  };

  const doSignUp = async (code: string) => {
    try {
      const result = await signup(
        provider.toUpperCase() as SocialLoginType,
        code
      );
      setToken(result);
      navigate("/");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      console.log("에러:", error);
      // TODO: 에러 처리 필요
    }
  };

  const doLogin = async (code: string) => {
    try {
      const result = await login(
        provider.toUpperCase() as SocialLoginType,
        code
      );
      setToken(result);
      navigate("/");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      console.log("에러:", error);
      // TODO: 에러 처리 필요
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get(URL_PARAMS_KEY.KAKAO_AUTH_CODE);

    if (code) {
      const action: string = localStorage.getItem(
        LOCAL_STORAGE_KEY.AUTH_ACTION
      )!;
      action === AUTH_ACTION.LOGIN ? doLogin(code) : doSignUp(code);
    }
  }, []);
};
