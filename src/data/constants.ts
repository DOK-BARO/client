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

export const BOOK_QUIZ_OPTION_MAX_LENGTH = 5;

export const EXTERNAL_SERVICE_INTRODUCTION_PAGE =
  "https://maddening-radar-044.notion.site/a13ecec47e8c4d789b6939c01733749e?pvs=4";
