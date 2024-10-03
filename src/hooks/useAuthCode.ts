import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup, login, getUser } from "@/services/server/authService.ts";
import {
  AUTH_ACTION,
  LOCAL_STORAGE_KEY,
  URL_PARAMS_KEY,
} from "../data/constants.ts";
import { SocialLoginType } from "../types/SocialLoginType.ts";
import { User } from "../types/User.ts";
import axios, { AxiosError } from "axios";
import { useAuth } from "./useAuth.ts";

export const useAuthCode = (provider: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { redirectToAuthPage } = useAuth();

  const setUserInLocalStorage = async () => {
    const user: User = await getUser();
    localStorage.setItem("certificationId", user.certificationId); // 로컬 스토리지에 토큰 저장
  };

  const doSignup = async (code: string) => {

  //const startAuth = async (code: string) => {
    // try {
    //   await signup(
    //     provider.toUpperCase() as SocialLoginType,
    //     code,
    //   );
    //   await setUserInLocalStorage();
    //   navigate("/");
    // }catch (error) {
    //   if(axios.isAxiosError(error)) {
    //     const axiosError = error as AxiosError;
    //     if (axiosError.response?.status === 400) {
    //       //TODO auth코드를 한번 더 받아야 할듯
    //       await redirectToAuthPage(provider.toUpperCase() as SocialLoginType);
    //       doLogin(code);
    //       //throw new Error(`이미 존재하는 계정입니다: ${error}`);
    //     }
    //   }
    // }
    try {
      await login(
        provider.toUpperCase() as SocialLoginType,
        code,
      );
      await setUserInLocalStorage();
      navigate("/");
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          // TODO : 회원가입
          //doSignUp(code);
          //TODO: 약관동의 페이지로 이동
          navigate("/user-auth-agreement");
        }
      }
      console.log("회원가입 오류:", error);
    }
  };


  const doSignUp = async (code: string) => {
    try {
      // 사용자 정보 전달하기
      await signup(provider.toUpperCase() as SocialLoginType, code);
      await setUserInLocalStorage();

      // 회원가입 페이지로 이동
      navigate("/register/complete");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          throw new Error(`이미 존재하는 계정입니다: ${error}`);
        }
      }
      console.log("회원가입 오류:", error);
    }
  };

  const doLogin = async (code: string) => {
    try {
      await login(provider.toUpperCase() as SocialLoginType, code);
      await setUserInLocalStorage();
      navigate("/");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          // TODO : 회원가입
          console.log("in 404 login");
          localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, AUTH_ACTION.SIGN_UP);
          await redirectToAuthPage(provider.toUpperCase() as SocialLoginType);
          doSignUp(code);
        }
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get(URL_PARAMS_KEY.AUTH_CODE);

    if (code) {
      const action = localStorage.getItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
      action === AUTH_ACTION.LOGIN ? doLogin(code) : doSignup(code);
    }
  }, []);
};
