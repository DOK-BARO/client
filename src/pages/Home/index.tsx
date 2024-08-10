import SocialAuthButton from "../../components/composite/socialAuthButton";
import HeaderLayout from "../../components/layout/headerLayout.tsx";
import { AUTH_TYPES, SOCIAL_TYPES } from "../../data/constants.ts";
import { isLoggedInState } from "../../context/atom.ts";
import { useRecoilState } from "recoil";

export default function Index() {
  const [isLoggedIn] = useRecoilState(isLoggedInState);
  return (
    <>
      <HeaderLayout isLoggedIn={isLoggedIn} />
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
