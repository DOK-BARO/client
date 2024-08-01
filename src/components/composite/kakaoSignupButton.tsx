import Button from "../atom/button";
import {useKakaoAuth} from "../../hooks/useKakaoAuth.ts";

const KakaoSignUpButton = () => {
  const { redirectToKakaoAuth, loading } = useKakaoAuth();

  const handleSignup = async () => {
    localStorage.setItem("authAction","signup");
    await redirectToKakaoAuth(); // 카카오 로그인 페이지로 리다이렉트
  };

  if(loading){
    return (<>로딩중</>);
  }
  return (
    <Button onClick={handleSignup}>
      {"카카오로 회원가입"}
    </Button>
  );
};

export default KakaoSignUpButton;
