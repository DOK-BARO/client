import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup, login, getUser } from "../services/server/authService.ts";
import {
  AUTH_ACTION,
  LOCAL_STORAGE_KEY,
  URL_PARAMS_KEY,
} from "../data/constants.ts";
import { SocialLoginType } from "../types/SocialLoginType.ts";
import { User } from "../types/User.ts";

export const useAuthCode = (provider: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const setUserInLocalStorage = async () => {
    const user: User = await getUser();
    localStorage.setItem("certificationId", user.certificationId); // 로컬 스토리지에 토큰 저장
  };

  const doSignup = async (code: string) => {
    try {
      // 사용자 정보 전달하기
      await signup(provider.toUpperCase() as SocialLoginType, code);
      await setUserInLocalStorage();

      // 회원가입 페이지로 이동
      navigate("/register/complete");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      console.log("회원가입 오류:", error);
      // TODO: 에러 처리 필요
    }
  };

  const doLogin = async (code: string) => {
    try {
      await login(provider.toUpperCase() as SocialLoginType, code);
      await setUserInLocalStorage();
      navigate("/");
      localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    } catch (error) {
      console.log("로그인 오류:", error);
      // TODO: 에러 처리 필요
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
