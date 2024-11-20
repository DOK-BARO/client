import { SocialLoginType } from "@/types/SocialLoginType.ts";
import { AuthType } from "@/types/AuthType.ts";

export const LOCAL_STORAGE_KEY = {
  AUTH_ACTION: "authAction",
};

export const AUTH_ACTION = {
  LOGIN: "login",
  SIGN_UP: "signup",
};

export const URL_PARAMS_KEY = {
  AUTH_CODE: "code",
};

export const SOCIAL_TYPES = [
  SocialLoginType.GITHUB,
  SocialLoginType.GOOGLE,
  SocialLoginType.KAKAO,
  SocialLoginType.NAVER,
  SocialLoginType.EMAIL,
] as const;

export const AUTH_TYPES = [AuthType.SIGNUP, AuthType.LOGIN] as const;

export const ICON_SIZE = 20;

export const APP_NAME = "DOKBARO";

export const QuestionFormMode = {
  QUESTION: "question",
  ANSWER: "answer",
} as const;
