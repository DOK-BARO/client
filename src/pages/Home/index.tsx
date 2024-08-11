import { useState } from "react";
import SocialAuthButton from "../../components/composite/socialAuthButton";
import GNB from "../../components/layout/gnb.tsx";
import { AUTH_TYPES, SOCIAL_TYPES } from "../../data/constants.ts";
import { navCategories } from "../../data/navCategories.ts";
import Button from "../../components/atom/button.tsx";

export default function Index() {
  // const [isLoggedIn] = useRecoilState(isLoggedInState);
  const [isGNBOpen, setIsGNBOpen] = useState<boolean>(); // 시험용

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
      <Button
        size="large"
        onClick={() => {
          setIsGNBOpen(!isGNBOpen);
        }}
      >
        GNB {isGNBOpen ? "닫기" : "열기"}
      </Button>
      {isGNBOpen && <GNB categories={navCategories}></GNB>}
    </>
  );
}
