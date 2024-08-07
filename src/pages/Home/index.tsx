import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
import KakaoSignUpButton from "../../components/composite/kakaoSignupButton.tsx";
import GoogleAuthButton from "../../components/composite/googleAuthButton.tsx";
import GithubAuthButton from "../../components/composite/githubAuthButton.tsx";
import GoogleSignUpButton from "../../components/composite/googleSignupButton.tsx";
import GithubSignUpButton from "../../components/composite/githubSignupButton.tsx";

export default function Index() {
  return (
    <>
      {/* <HeaderLayout isLoggedIn={true} /> */}
      <KakaoAuthButton />
      <KakaoSignUpButton />
      <GoogleAuthButton />
      <GoogleSignUpButton />
      <GithubAuthButton />
      <GithubSignUpButton />
    </>
  );
}
