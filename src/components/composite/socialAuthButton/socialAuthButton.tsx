import React, { ReactElement } from "react";
import styles from "./_social_auth_button.module.scss";
import { SocialLoginType } from "@/types/SocialLoginType";
import { Kakao } from "@/svg/auth/kakao.tsx";
import { Google } from "@/svg/auth/google.tsx";
import { Naver } from "@/svg/auth/naver.tsx";
import { Github } from "@/svg/auth/github.tsx";
import { Email } from "@/svg/auth/email.tsx";
import Button from "@/components/atom/button/button.tsx";
import { IsEmailLoginPageAtom } from "@/store/authModalAtom";
import { useAtom } from "jotai";
import { authService } from "@/services/server/authService";

const SocialAuthButton: React.FC<{
  socialType: SocialLoginType;
}> = ({ socialType }) => {
  const [, setIsEmailLoginPage] = useAtom(IsEmailLoginPageAtom);

  const handleAuth = async () => {
    if (socialType === SocialLoginType.EMAIL) {
      // 이메일 회원가입
      // 이메일로 계속하기 누르면 로그인 창 뜨고 사용자가 선택해서 회원가입할 수 있도록 하기
      setIsEmailLoginPage(true);
    } else {
      // 소셜 회원가입
      const redirectUrl = "https://local.dev.dokbaro.kro.kr:5173/";
      authService.socialSignupOrLogin({ socialType, redirectUrl });
    }
  };

  const buttonContent = ():
    | { socialTypeText: string; socialTypeImg: ReactElement }
    | string => {
    let socialTypeText = "";
    let socialTypeImg: ReactElement = <></>;
    switch (socialType) {
      case SocialLoginType.KAKAO:
        socialTypeText = "카카오계정으로";
        socialTypeImg = <Kakao alt="카카오 로고" />;
        break;
      case SocialLoginType.GOOGLE:
        socialTypeText = "구글계정으로";
        socialTypeImg = <Google alt="구글 로고" />;
        break;
      case SocialLoginType.NAVER:
        socialTypeText = "네이버계정으로";
        socialTypeImg = <Naver alt="네이버 로고" />;
        break;
      case SocialLoginType.GITHUB:
        socialTypeText = "깃허브계정으로";
        socialTypeImg = <Github alt="깃허브 로고" />;
        break;
      case SocialLoginType.EMAIL:
        socialTypeText = "이메일로";
        socialTypeImg = <Email alt="이메일 아이콘" />;
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

  const buttonText = `${socialTypeText} 계속하기`;
  return (
    <Button
      className={styles[`${socialType.toLowerCase()}-auth-button`]}
      onClick={handleAuth}
      icon={socialTypeImg}
      iconPosition="left"
      fullWidth
    >
      {buttonText}
    </Button>
  );
};
export default SocialAuthButton;
