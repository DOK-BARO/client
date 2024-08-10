import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  loginByGithub,
  loginByGoogle,
  loginByKakao,
  loginByNaver,
  signupByGoogle,
  signupByKakao,
} from "../services/authService.ts";
import { AuthResponse } from "../types/AuthResponse.ts";
import {
  AUTH_ACTION,
  LOCAL_STORAGE_KEY,
  URL_PARAMS_KEY,
} from "../data/constants.ts";

export const useAuthCode = (provider: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  const setToken = (result: AuthResponse) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, result.accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, result.refreshToken);
  };

  const doSignUp = async (code: string) => {
    try {
      let result;
      if (provider === "kakao") {
        result = await signupByKakao(code);
      } else if (provider === "google") {
        result = await signupByGoogle(code);
      } else {
        // signupByGithub
      }
      setToken(result!);
      navigate("/");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      // todo 에러 처리 필요
    }
  };

  const doLogin = async (code: string) => {
    try {
      let result;
      if (provider === "kakao") {
        result = await loginByKakao(code);
      } else if (provider === "google") {
        result = await loginByGoogle(code);
      } else if (provider === "github") {
        result = await loginByGithub(code);
      }else if(provider === "naver"){
        result = await loginByNaver(code);
      }

      setToken(result!);
      navigate("/");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      // todo 에러 처리 필요
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get(URL_PARAMS_KEY.AUTH_CODE);
   // console.log("urlParams", urlParams);
   // const code = urlParams.get(URL_PARAMS_KEY.KAKAO_AUTH_CODE);

    if (code) {
      const action: string = localStorage.getItem(
        LOCAL_STORAGE_KEY.AUTH_ACTION
      )!;
      action === AUTH_ACTION.LOGIN ? doLogin(code) : doSignUp(code);
    }
  }, []);
};
