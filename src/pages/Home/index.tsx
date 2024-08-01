import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
// import HeaderLayout from "../../components/layout/headerLayout.tsx";
import { useAuthCode } from "../../hooks/useAuthCode.ts";
import KakaoSignUpButton from "../../components/composite/kakaoSignupButton.tsx";

export default function Index() {
  useAuthCode();
  return (
    <>
      {/* <HeaderLayout isLoggedIn={true} /> */}
      <KakaoAuthButton />
      <KakaoSignUpButton />
    </>
  );
}
