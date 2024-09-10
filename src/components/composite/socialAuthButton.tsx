import React, { ReactElement } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../atom/button";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "../../data/constants";
import { SocialLoginType } from "../../types/SocialLoginType";
import { AuthType } from "../../types/AuthType";
import styles from "../../styles/components/_social_auth_button.module.scss";
import { Kakao } from "../../../public/assets/svg/auth/kakao.tsx";
import { Google } from "../../../public/assets/svg/auth/google.tsx";
import { Naver } from "../../../public/assets/svg/auth/naver.tsx";
import { Github } from "../../../public/assets/svg/auth/github.tsx";
import { Email } from "../../../public/assets/svg/auth/email.tsx";

const SocialAuthButton: React.FC<{
  authType: AuthType;
  socialType: SocialLoginType;
}> = ({ authType, socialType }) => {
  const { redirectToAuthPage, loading } = useAuth();

  const handleAuth = async () => {
    const action =
      authType === AuthType.SIGNUP ? AUTH_ACTION.SIGN_UP : AUTH_ACTION.LOGIN;
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, action);
    await redirectToAuthPage(socialType);
  };

  const buttonContent = () => {

    if (loading) {
      return "로딩중";
    }

    let socialTypeText;
    let socialTypeImg: ReactElement = <></>;
    if (socialType === SocialLoginType.KAKAO) {
      socialTypeText = "카카오계정으";
      socialTypeImg = <Kakao/>;
    } else if (socialType === SocialLoginType.GOOGLE) {
      socialTypeText = "구글계정으";
      socialTypeImg = <Google/>;
    } else if (socialType === SocialLoginType.NAVER) {
      socialTypeText = "네이버계정으";
      socialTypeImg = <Naver/>;
    } else if (socialType === SocialLoginType.GITHUB) {
      socialTypeText = "깃허브계정으";
      socialTypeImg = <Github/>;
    } else if (socialType === SocialLoginType.EMAIL) {
      socialTypeText = "이메일";
      socialTypeImg = <Email/>;
    }

    return (<>
      <div>{socialTypeImg}</div>
      <div>{`${socialTypeText}${
        authType === AuthType.SIGNUP ? "회원가입" : "로 계속하기"
      }`}
      </div>
    </>);
  };

  return (
    <Button
      className={styles[`${socialType.toLowerCase()}-auth-button`]}
      onClick={handleAuth}
      disabled={loading}
    >
      {buttonContent()}
    </Button>
  );
};
export default SocialAuthButton;
