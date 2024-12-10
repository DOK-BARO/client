import { authService } from "@/services/server/authService";
import { UserType } from "@/types/UserType";
import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import {
//   AUTH_ACTION,
//   LOCAL_STORAGE_KEY,
//   URL_PARAMS_KEY,
// } from "../data/constants.ts";
// import { SocialLoginType } from "../types/SocialLoginType.ts";
// import axios, { AxiosError } from "axios";
// import { UserType } from "@/types/UserType.ts";
// // import { useRedirectToAuthPage } from "@/hooks/useRedirectToAuthPage.ts";
// import { authService } from "@/services/server/authService.ts";

// 로그인, 회원가입
export const useAuth = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const { redirectToAuthPage } = useRedirectToAuthPage();

  // 로컬 스토리지에 토큰(certificationId) 저장
  const setUserInLocalStorage = async () => {
    const user: UserType = await authService.fetchUser();
    localStorage.setItem("certificationId", user.certificationId);
  };

  // const doSignUp = async (code: string) => {
  //   try {
  //     console.log("in do signup in useAuthcode");
  //     // 사용자 정보 전달하기
  //     await authService.socialSignup(
  //       provider.toUpperCase() as SocialLoginType,
  //       code
  //     );
  //     await setUserInLocalStorage();

  //     if (
  //       (provider.toUpperCase() as SocialLoginType) !== SocialLoginType.EMAIL
  //     ) {
  //       navigate("/register/social");
  //     } else {
  //       // 회원가입 페이지로 이동
  //       navigate("/register/complete");
  //     }

  //     localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as AxiosError;
  //       if (axiosError.response?.status === 404) {
  //         throw new Error(`이미 존재하는 계정입니다: ${error}`);
  //       }
  //     }
  //     console.log("회원가입 오류:", error);
  //   }
  // };

  // const doLogin = async (code: string) => {
  //   try {
  //     await authService.socialLogin(
  //       provider.toUpperCase() as SocialLoginType,
  //       code
  //     );
  //     await setUserInLocalStorage();
  //     navigate("/");
  //     localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as AxiosError;
  //       if (axiosError.response?.status === 404) {
  //         // TODO : 회원가입
  //         localStorage.setItem(
  //           LOCAL_STORAGE_KEY.AUTH_ACTION,
  //           AUTH_ACTION.SIGN_UP
  //         );
  //         // await redirectToAuthPage(provider.toUpperCase() as SocialLoginType);
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    // const urlParams = new URLSearchParams(location.search);
    // const code = urlParams.get(URL_PARAMS_KEY.AUTH_CODE);
    // if (code) {
    // console.log(code);
    // const action = localStorage.getItem(LOCAL_STORAGE_KEY.AUTH_ACTION);
    // action === AUTH_ACTION.LOGIN ? doLogin(code) : doSignUp(code);
    // }
  }, []);
  return { setUserInLocalStorage };
};
