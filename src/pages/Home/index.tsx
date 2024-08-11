import SocialAuthButton from "../../components/composite/socialAuthButton";
import { AUTH_TYPES, SOCIAL_TYPES } from "../../data/constants.ts";

export default function Index() {
  // const [isLoggedIn] = useRecoilState(isLoggedInState);
  return (
    <>
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
