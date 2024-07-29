import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
// import HeaderLayout from "../../components/layout/headerLayout.tsx";
import KakaoSignUpButton from "../../components/composite/kakaoSignupButton.tsx";

export default function Index() {
  return (
    <>
      {/* <HeaderLayout isLoggedIn={true} /> */}
      <KakaoSignUpButton />
      <KakaoAuthButton />
    </>
  );
}
