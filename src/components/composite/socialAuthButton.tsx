import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../atom/button";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "../../data/constants";
import { SocialLoginType } from "../../types/SocialLoginType";

export enum AuthType {
  SIGNUP = 1,
  LOGIN = 2,
}

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

  return (
    <Button onClick={handleAuth} disabled={loading}>
      {loading
        ? "로딩중"
        : `${socialType} ${
            authType === AuthType.SIGNUP ? "회원가입" : "로그인"
          }`}
    </Button>
  );
};
export default SocialAuthButton;
