import { ErrorType } from "@/types/ErrorType";
import { AxiosError } from "axios";

// 공통 에러 처리 함수
export const handleAxiosError = (error: unknown) => {
  const err = error as AxiosError;
  if (err.response) {
    const { status, data } = err.response;
    const message = (data as { message: string })?.message;
    throw { code: status, message, details: data } as ErrorType;
  }
  //   else if (err.request) {
  //     throw {
  //       code: 503,
  //       message: "Service unavailable. Please try again later.",
  //     } as ErrorType;
  //   } else {
  //     throw {
  //       code: 500,
  //       message: err.message || "An unknown error occurred.",
  //     } as ErrorType;
  //   }
};
