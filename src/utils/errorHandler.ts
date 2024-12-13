import { authService } from "@/services/server/authService";
import { ErrorType } from "@/types/ErrorType";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { clearAuthWithPageStatus } from "./clearAuthWithPageStatus";

// 공통 에러 처리 함수
export const handleAxiosError = (error: unknown) => {
  const err = error as AxiosError;
  if (err.response) {
    const { status, data } = err.response;
    const message = (data as { message: string })?.message;
    throw { code: status, message, details: data } as ErrorType;
  }
};

// query 에러
export const handleQueryError = (error: ErrorType) => {
  switch (error.code) {
    case 401:
      // 토큰 만료 -> 자동 로그아웃
      authService.logout();
      toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
      break;
    case 403:
      // 로그인 사용자의 경우: 로그인한 계정으로 접근 불가 페이지
      // 로그아웃 사용자의 경우: 로그인 해야됨
      toast.error("이 기능을 사용하기 위해서는 적절한 권한이 필요합니다.");
      break;
    case 500:
      clearAuthWithPageStatus();
      toast.error("서버 오류가 발생했습니다. 관리자에게 문의해주세요.");
      break;
    default:
      toast.error(
        error.message || "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요."
      );
  }
};
