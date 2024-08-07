import Button from "../atom/button";
import { useAuth } from "../../hooks/useAuth.ts";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "../../data/constants.ts";
import { SocialLoginType } from "../../types/SocialLoginType.ts";

const GoogleSignUpButton = () => {
  const { redirectToAuthPage, loading } = useAuth();

  const handleSignup = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, AUTH_ACTION.SIGN_UP);
    await redirectToAuthPage(SocialLoginType.GOOGLE); // 구글 로그인 페이지로 리다이렉트
  };

  if (loading) {
    return <>로딩중</>;
  }
  return <Button onClick={handleSignup}>{"구글로 회원가입"}</Button>;
};

export default GoogleSignUpButton;
