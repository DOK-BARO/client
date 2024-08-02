import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
import KakaoSignUpButton from "../../components/composite/kakaoSignupButton.tsx";

export default function Index() {
  return (
    <>
      {/* <HeaderLayout isLoggedIn={true} /> */}
      <KakaoAuthButton />
      <KakaoSignUpButton />
    </>
  );
}
