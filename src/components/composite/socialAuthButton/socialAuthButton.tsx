import React, { Dispatch, ReactElement, SetStateAction } from "react";
import styles from "./_social_auth_button.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "@/data/constants";
import { SocialLoginType } from "@/types/SocialLoginType";
import { AuthType } from "@/types/AuthType";
import { Kakao } from "@/svg/auth/kakao.tsx";
import { Google } from "@/svg/auth/google.tsx";
import { Naver } from "@/svg/auth/naver.tsx";
import { Github } from "@/svg/auth/github.tsx";
import { Email } from "@/svg/auth/email.tsx";
import Button from "@/components/atom/button/button.tsx";
import { IsEmailLoginPage } from "@/store/authModalAtom";
import { useAtom } from "jotai";

const SocialAuthButton: React.FC<{
  authType: AuthType;
  socialType: SocialLoginType;
}> = ({ authType, socialType }) => {
  const { redirectToAuthPage, loading } = useAuth();
  const [, setIsEmailLoginPage] = useAtom(IsEmailLoginPage);
  const emailRegisterPage = "/register/email";
  const handleAuth = async () => {
    const action =
      authType === AuthType.SIGNUP ? AUTH_ACTION.SIGN_UP : AUTH_ACTION.LOGIN;
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, action);

    if (socialType === SocialLoginType.EMAIL) {
      // 이메일 회원가입
      // window.location.href = emailRegisterPage;
      // 이메일로 계속하기 누르면 로그인 창 뜨고 사용자가 선택해서 회원가입할 수 있도록 하기
      setIsEmailLoginPage(true);
    } else {
      // 소셜 미디어 회원가입
      await redirectToAuthPage(socialType);
    }
  };

  const buttonContent = ():
    | { socialTypeText: string; socialTypeImg: ReactElement }
    | string => {
    if (loading) {
      return "로딩중";
    }

    let socialTypeText = "";
    let socialTypeImg: ReactElement = <></>;
    switch (socialType) {
      case SocialLoginType.KAKAO:
        socialTypeText = "카카오계정으로";
        socialTypeImg = <Kakao alt="카카오" />;
        break;
      case SocialLoginType.GOOGLE:
        socialTypeText = "구글계정으로";
        socialTypeImg = <Google alt="구글" />;
        break;
      case SocialLoginType.NAVER:
        socialTypeText = "네이버계정으로";
        socialTypeImg = <Naver alt="네이버" />;
        break;
      case SocialLoginType.GITHUB:
        socialTypeText = "깃허브계정으로";
        socialTypeImg = <Github alt="깃허브" />;
        break;
      case SocialLoginType.EMAIL:
        socialTypeText = "이메일";
        socialTypeImg = <Email alt="이메일" />;
        break;
      default:
        throw new Error("존재하지 않는 Auth Type입니다.");
    }

    return { socialTypeText, socialTypeImg };
  };

  const content = buttonContent();

  let socialTypeText = "";
  let socialTypeImg: ReactElement = <></>;

  if (typeof content !== "string") {
    ({ socialTypeText, socialTypeImg } = content);
  }

  return (
    <Button
      className={styles[`${socialType.toLowerCase()}-auth-button`]}
      onClick={handleAuth}
      disabled={loading}
      fullWidth
      icon={socialTypeImg}
      iconPosition="left"
    >
      {`${socialTypeText}${
        authType === AuthType.SIGNUP ? "회원가입" : "로 계속하기"
      }`}
    </Button>
  );
};
export default SocialAuthButton;
