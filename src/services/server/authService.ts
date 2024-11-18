import axios, { AxiosError } from "axios";
import { AuthResponse } from "../../types/AuthResponse.ts";
import { SocialLoginType } from "../../types/SocialLoginType.ts";
import localApi from "../local/LocalApi.ts";
import { UserType } from "@/types/UserType.ts";
import { TermsOfServiceType } from "@/types/TermsOfServiceType.ts";

// TODO: 함수명 api로부터 바로 가져오는건 fetch, 그 외 get
const redirectedUrl = import.meta.env.VITE_AUTH_REDIRECTED_URL;
export const getAuthUrl = async (
  socialLoginType: SocialLoginType
): Promise<string> => {
  try {
    const { data } = await axios.get(
      `/auth/oauth2/authorize/${socialLoginType}?redirectUrl=${redirectedUrl}/${socialLoginType.toLowerCase()}`
    );
    return data.url; // 임시 임의 리턴값
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};

// TODO: 함수명에서 '소셜' 명시하기
export const login = async (
  socialType: SocialLoginType,
  token: string
): Promise<AuthResponse> => {
  const postData = {
    token,
    redirectUrl: `${redirectedUrl}/${socialType.toLocaleLowerCase()}`,
  };
  console.log(postData.redirectUrl);
  try {
    const { data } = await axios.post(
      `/auth/oauth2/login/${socialType}`,
      postData
    );
    console.log("data", data); // 응답 객체 출력
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        console.log("in 404 in authService");
        throw error;
        //throw new Error(`존재하지 않는 계정입니다: ${error}`);
      }
      throw new Error(`로그인 요청: ${error}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

// 소셜 회원가입
// TODO: 함수명에서 '소셜' 명시하기
export const signup = async (
  socialType: SocialLoginType,
  token: string
): Promise<AuthResponse> => {
  try {
    const postData = {
      token,
      redirectUrl: `${redirectedUrl}/${socialType.toLocaleLowerCase()}`,
    };
    const { data } = await axios.post(
      `/auth/oauth2/signup/${socialType}`,
      postData
    );
    return data; // 임시 임의 리턴값
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        //throw new Error(`이미 존재하는 계정입니다: ${error}`);
        throw error;
      }
      throw new Error(`회원가입 실패: ${error}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

// 이메일 회원가입
export const emailSignup = async (userInfo: {
  email: string;
  password: string;
  nickName: string;
  profileImage?: string | null;
}) => {
  try {
    const response = await axios.post("/auth/email/signup", userInfo);
    console.log("이메일 회원가입 post 응답", response);
    return response;
  } catch (error) {
    throw new Error(`이메일 회원가입 실패: ${error}`);
  }
};

// 문서 상에는 'modify login member' 로 명시되어 있음.
export const updateUser = async (userInfo: {
  nickName: string;
  email: string;
  profileImage?: string | null; // TODO: 필수인가?
}) => {
  try {
    const response = await axios.put("/members/login-user", userInfo);
    console.log(response);
  } catch (error) {
    throw new Error(`로그인 유저 실패: ${error}`);
  }
};

// 프로필 업데이트
// TODO: fetch~로 함수명 변경하기
export const getUser = async (): Promise<UserType> => {
  try {
    const { data } = await axios.get("/members/login-user");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        console.log("in 404 in get user");
        throw error;
      }
      if (axiosError.response?.status === 500) { 
        console.log("500 in get user");
        fetchRefreshToken();// TODO: 백엔드에서 401 정의 후 fetchRefreshToken 호출위치 그곳으로 변경
      }
      throw new Error(`로그인 요청: ${error}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const getUserIfAuthenticated = async (): Promise<UserType | null> => {
  const certificationId = !!localApi.getUserCertificationId();

  if (!certificationId) {
    return null;
  }

  return await getUser();
};

// 이용약관 조회
export const fetchTerms = async (): Promise<TermsOfServiceType[] | null> => {
  try {
    const { data } = await axios.get("/terms-of-services");
    return data;
  } catch (error) {
    throw new Error(`이용약관 가져오기 실패: ${error}`);
  }
};

// 이용약관 상세 내용 조회
export const fetchTermDetail = async (
  id: number
): Promise<string | undefined> => {
  try {
    const { data } = await axios.get(`/terms-of-services/${id}/detail`);
    return data.value;
  } catch (error) {
    console.error(error);
    throw new Error(`이용약관 상세 내용 가져오기 실패: ${error}`);
  }
};

// 이용약관 동의 요청
export const sendTermsAgreement = async (items: number[]) => {
  try {
    const response = await axios.post("/terms-of-services/agree", { items });
    console.log(response);
  } catch (error) {
    throw new Error(`이용약관 동의 실패: ${error}}`);
  }
};

// 이메일로 인증코드 보내기
export const sendEmailCode = async (email: string) => {
  try {
    const response = await axios.post("/email-authentications", {
      email: email,
    });
    if (response.status === 201) {
      console.log(response);
    }
  } catch (error) {
    throw new Error(`이메일로 인증코드 보내기 실패: ${error}`);
  }
};

export const matchEmailCode = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  try {
    const { data } = await axios.post("/email-authentications/match-code", {
      email: email,
      code: code,
    });
    // axios 타입으로 바꾸기
    return data;
  } catch (error) {
    // 인증코드가 일치하지 않을 경우
    // TODO: 상세한 에러 처리 필요
    throw new Error(`인증코드 일치 실패: ${error}`);
  }
};

export const fetchRefreshToken = async () => {
  try {
    const { data } = await axios.post("/token/refresh");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        console.log("refresh token 404");
        localApi.removeCertification();
        throw error;
      }
      throw new Error(`리프레시 토큰 요청: ${error}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};
