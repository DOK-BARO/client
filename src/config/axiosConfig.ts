import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

const logOnDev = (message: string) => {
  if (import.meta.env.DEV) {
    console.log(message);
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;

    logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return Promise.reject(new Error("요청 시간이 초과되었습니다."));
    }
    return Promise.reject(error);
  },

  // (error) => {
  //   // TODO: useQuery 에러 처리랑 겹치는 부분 어떻게 할지
  //   const status = error?.response?.status;
  //   if (status === 401 && !isToastShown) {
  //     // 인증로직 실패 (토큰 만료 -> 자동 로그아웃)
  //     console.log("토큰 만료, 로그인 다시 해야됨");
  //     authService.logout();
  //   } else if (status === 403 && !isToastShown) {
  //     isToastShown = true;
  //     //로그인 해도 안되는 경우 인가에러
  //     //TODO: toast: 접근할 수 없는 경로입니다.
  //     // 로그인 안된경우: 로그인해주세요
  //     // 로그인 된경우: 접근할 권한이 없습니다
  //     //   toast.error("로그인한 계정으로는 접근할 권한이 없습니다.");
  //     toast.error("로그인 후 이용할 수 있는 페이지입니다.");
  //   } else if (status === 500 && !isToastShown) {
  //     isToastShown = true;
  //     toast.error("알 수 없는 에러가 발생했습니다.");
  //     clearAuthWithPageStatus();
  //   }

  //   return Promise.reject(error);
  // }
);
