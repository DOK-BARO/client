import SocialAuthButton, {
  AuthType,
} from "../../components/composite/socialAuthButton";
import { SocialLoginType } from "../../types/SocialLoginType";

export default function Index() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* <HeaderLayout isLoggedIn={true} /> */}

      {/* 카카오 버튼 */}
      <div>
        <SocialAuthButton
          authType={AuthType.SIGNUP}
          socialType={SocialLoginType.KAKAO}
        />
        <SocialAuthButton
          authType={AuthType.LOGIN}
          socialType={SocialLoginType.KAKAO}
        />
      </div>

      {/* 구글 버튼 */}
      <div>
        <SocialAuthButton
          authType={AuthType.SIGNUP}
          socialType={SocialLoginType.GOOGLE}
        />
        <SocialAuthButton
          authType={AuthType.LOGIN}
          socialType={SocialLoginType.GOOGLE}
        />
      </div>

      {/* 깃허브 버튼 */}
      <div>
        <SocialAuthButton
          authType={AuthType.SIGNUP}
          socialType={SocialLoginType.GITHUB}
        />
        <SocialAuthButton
          authType={AuthType.LOGIN}
          socialType={SocialLoginType.GITHUB}
        />
      </div>

      {/* 네이버 버튼 */}
      <div>
        <SocialAuthButton
          authType={AuthType.SIGNUP}
          socialType={SocialLoginType.NAVER}
        />
        <SocialAuthButton
          authType={AuthType.LOGIN}
          socialType={SocialLoginType.NAVER}
        />
      </div>
    </div>
  );
}
