import axios from "axios";
import { authService } from "@/services/server/authService";
import localApi from "@/services/local/LocalApi";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

const logOnDev = (message: string) => {
  if (import.meta.env.DEV) {
    console.log(message);
  }
  if (import.meta.env.DEV) {
    console.log(message);
  }
};

const clearAuthWithPageStatus = () => {
	window.location.href = '/';
	localApi.removeAll();
}

axiosInstance.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;

  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);
  return response;
}, (error) => {

  if (error.response?.status === 401){  // 인증로직 실패
		authService.logout();
  }else if (error.response?.status === 403) { //로그인 해도 안되는 경우 인가에러
    //TODO: toast: 접근할 수 없는 경로입니다.
		// 로그인 안된경우: 로그인해주세요
		//로그인 된경우: 접근할 권한이 없습니다
  } else if (error.response?.status === 404) {
    //TODO: 에러 이미지 페이지 구현

  } else if (error.response?.status === 500) {
		// toast: 알수없는 에러가 발생했습니다
		clearAuthWithPageStatus();
  }

  return Promise.reject(error);
});