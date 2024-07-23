import KakaoAuthButton from "../../components/composite/kakaoAuthButton.tsx";
import HeaderLayout from "../../components/layout/headerLayout.tsx";

export default function Index() {
  return (
    <>
      <HeaderLayout isLoggedIn={true} />
      <KakaoAuthButton />
    </>
  );
}
