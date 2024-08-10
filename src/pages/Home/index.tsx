import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
import KakaoSignUpButton from "../../components/composite/kakaoSignupButton.tsx";
import GoogleAuthButton from "../../components/composite/googleAuthButton.tsx";
import GithubAuthButton from "../../components/composite/githubAuthButton.tsx";
import NaverAuthButton from "../../components/composite/naverAuthButton.tsx";
import GoogleSignUpButton from "../../components/composite/googleSignupButton.tsx";
import HeaderLayout from "../../components/layout/headerLayout.tsx";

export default function Index() {
  return (
    <>
      <HeaderLayout isLoggedIn={false} />
      <KakaoAuthButton />
      <KakaoSignUpButton />
      <GoogleAuthButton />
      <GoogleSignUpButton />
      <GithubAuthButton />
      <NaverAuthButton />
    </>
  );
}
