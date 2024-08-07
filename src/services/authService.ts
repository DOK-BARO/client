import axios from "axios";
import { AuthResponse } from "../types/AuthResponse.ts";
import { SocialLoginType } from "../types/SocialLoginType.ts";

export const getAuthUrl = async (
  socialLoginType: SocialLoginType
): Promise<string> => {
  console.log("get kakao auth url");
  try {
    const { data } = await axios.get(
      `/auth/oauth2/authorize/${socialLoginType}`
    );
    console.log(data); // 응답 객체 출력
    return data.url; // 임시 임의 리턴값
  } catch (error) {
    throw new Error(`권한 부여 URL 가져오기 실패: ${error}`);
  }
};

export const login = async (
  socialType: SocialLoginType,
  token: string
): Promise<AuthResponse> => {
  const postData = {
    token,
    redirectUrl: `http://localhost:5173/oauth2/redirected/${socialType.toLocaleLowerCase()}`,
  };
  console.log(postData.redirectUrl);
  try {
    const { data } = await axios.post(
      `/auth/oauth2/login/${socialType}`,
      postData
    );
    console.log("data", data); // 응답 객체 출력
    return data;
  } catch (error) {
    console.error("console.error", error);
    throw new Error(`로그인 요청: ${error}`);
  }
};

export const signup = async (
  socialType: SocialLoginType,
  token: string
): Promise<AuthResponse> => {
  try {
    const postData = {
      token,
      redirectUrl: `http://localhost:5173/oauth2/redirected/${socialType.toLocaleLowerCase()}`,
    };
    const { data } = await axios.post(
      `/auth/oauth2/signup/${socialType}`,
      postData
    );
    return data; // 임시 임의 리턴값
  } catch (error: any) {
    if (error.response.status === 400) {
      throw new Error(`이미 존재하는 계정입니다: ${error}`);
    }
    throw new Error(`회원가입 실패: ${error}`);
  }
};
