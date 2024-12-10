import axios from "axios";
import { authService } from "@/services/server/authService";
import localApi from "@/services/local/LocalApi";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

const logOnDev = (message: string) => {
  if (import.meta.env.DEV) {
    console.log(message);
  }
};

const clearAuthWithPageStatus = () => {
  window.location.href = "/";
  localApi.removeAll();
};

let isToastShown = false;

axiosInstance.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;

    logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && !isToastShown) {
      // 인증로직 실패 (토큰 만료 -> 자동 로그아웃)
      isToastShown = true;
      authService.logout();
    } else if (status === 403 && !isToastShown) {
      isToastShown = true;
      //로그인 해도 안되는 경우 인가에러
      //TODO: toast: 접근할 수 없는 경로입니다.
      // 로그인 안된경우: 로그인해주세요
      // 로그인 된경우: 접근할 권한이 없습니다
      //   toast.error("로그인한 계정으로는 접근할 권한이 없습니다.");
      toast.error("로그인 후 이용할 수 있는 페이지입니다.");
    } else if (status === 500 && !isToastShown) {
      isToastShown = true;
      toast.error("알 수 없는 에러가 발생했습니다.");
      clearAuthWithPageStatus();
    }

    return Promise.reject(error);
  }
);
