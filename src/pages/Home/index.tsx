import SocialAuthButton from "../../components/composite/socialAuthButton";
import { SocialLoginType } from "../../types/SocialLoginType";
import { AuthType } from "../../types/AuthType";
import HeaderLayout from "../../components/layout/headerLayout.tsx";

const SOCIAL_TYPES = [
  SocialLoginType.KAKAO,
  SocialLoginType.GOOGLE,
  SocialLoginType.GITHUB,
  SocialLoginType.NAVER,
] as const;

const AUTH_TYPES = [AuthType.SIGNUP, AuthType.LOGIN] as const;

export default function Index() {
  return (
    <>
      <HeaderLayout isLoggedIn={false} />
      <div style={{ display: "flex", gap: "10px" }}>
        {SOCIAL_TYPES.map((socialType) => (
          <div key={socialType}>
            {AUTH_TYPES.map((authType) => (
              <SocialAuthButton
                key={`${socialType}-${authType}`}
                authType={authType}
                socialType={socialType}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
