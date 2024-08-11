import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../atom/button";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "../../data/constants";
import { SocialLoginType } from "../../types/SocialLoginType";
import { AuthType } from "../../types/AuthType";
import styles from "../../styles/components/_social_auth_button.module.scss";

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

  // const buttonText = loading
  //   ? "로딩중"
  //   : `${socialType}${authType === AuthType.SIGNUP ? "회원가입" : "계정으로 로그인"}`;

  const buttonText = () => {
    if (loading) {
      return "로딩중";
    }

    let socialTypeText;
    if (socialType === SocialLoginType.KAKAO) {
      socialTypeText = "카카오";
    } else if (socialType === SocialLoginType.GOOGLE) {
      socialTypeText = "구글";
    } else if (socialType === SocialLoginType.NAVER) {
      socialTypeText = "네이버";
    } else if (socialType === SocialLoginType.GITHUB) {
      socialTypeText = "깃허브";
    }
    return `${socialTypeText}${
      authType === AuthType.SIGNUP ? "회원가입" : "계정으로 로그인"
    }`;
  };

  const buttonLogoSrc = `/public/assets/svg/${socialType.toLowerCase()}-logo.svg`;
  const alt = `${socialType} 로그인 버튼`;

  return (
    <Button
      className={styles[`${socialType.toLowerCase()}-auth-button`]}
      onClick={handleAuth}
      disabled={loading}
    >
      <img src={buttonLogoSrc} alt={alt}></img>
      <div>{buttonText()}</div>
    </Button>
  );
};
export default SocialAuthButton;
