import { SocialLoginType } from "../types/SocialLoginType.ts";
import { AuthType } from "../types/AuthType.ts";

export const LOCAL_STORAGE_KEY = {
  AUTH_ACTION: "authAction",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const AUTH_ACTION = {
  LOGIN: "login",
  SIGN_UP: "signup",
};

export const URL_PARAMS_KEY = {
  AUTH_CODE : "code",
};

export const SOCIAL_TYPES = [
  SocialLoginType.GITHUB,
  SocialLoginType.GOOGLE,
  SocialLoginType.KAKAO,
  SocialLoginType.NAVER,
] as const;

export const AUTH_TYPES = [AuthType.SIGNUP, AuthType.LOGIN] as const;