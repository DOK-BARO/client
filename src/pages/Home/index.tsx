import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
import KakaoSignUpButton from "../../components/composite/kakaoSignupButton.tsx";
import GoogleAuthButton from "../../components/composite/googleAuthButton.tsx";
import GithubAuthButton from "../../components/composite/githubAuthButton.tsx";
import NaverAuthButton from "../../components/composite/naverAuthButton.tsx";

export default function Index() {
  return (
    <>
      {/* <HeaderLayout isLoggedIn={true} /> */}
      <KakaoAuthButton />
      <KakaoSignUpButton />
      <GoogleAuthButton />
      <GithubAuthButton />
      <NaverAuthButton />
    </>
  );
}
