import SocialAuthButton from "../../components/composite/socialAuthButton";
import GNB from "../../components/layout/gnb.tsx";
import { AUTH_TYPES, SOCIAL_TYPES } from "../../data/constants.ts";
import { navCategories } from "../../data/navCategories.ts";
import Button from "../../components/atom/button.tsx";
import useGNB from "../../hooks/useGNB.ts";

export default function Index() {
  // const [isLoggedIn] = useRecoilState(isLoggedInState);
  const { openGNB, isGNBOpen } = useGNB();

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
      <Button size="large" onClick={openGNB}>
        GNB {isGNBOpen ? "닫기" : "열기"}
      </Button>
      {isGNBOpen && <GNB categories={navCategories}></GNB>}
    </>
  );
}
