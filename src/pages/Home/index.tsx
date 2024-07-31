// import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
// import HeaderLayout from "../../components/layout/headerLayout.tsx";
import { useAuthCode } from "../../hooks/useAuthCode.ts";
export default function Index() {
  useAuthCode();
  return (
    <>
      home
      {/* <HeaderLayout isLoggedIn={true} /> */}
      {/* <KakaoAuthButton /> */}
    </>
  );
}
