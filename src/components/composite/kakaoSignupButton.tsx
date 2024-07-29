
import Button from "../atom/button";
import { signupByKakao } from "../../services/authService.ts";
// import { useKakaoAuth } from "../../hooks/useKakaoAuth.ts";

const KakaoSignUpButton = () => {
  //const { redirectToKakaoAuth, loading } = useKakaoAuth();
  const signup = async () => {
    //await redirectToKakaoAuth();
    const authToken:string = localStorage.getItem("authCode") ?? "error";
    const token = await signupByKakao(authToken);
    console.log("token: "+JSON.stringify(token));
    if(token){
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
    }
  };
  // if(loading){
  //   return (<>로딩중</>);
  // }
  return (
    <Button onClick={signup}>
      {"카카오로 회원가입"}
    </Button>
  );
};

export default KakaoSignUpButton;
