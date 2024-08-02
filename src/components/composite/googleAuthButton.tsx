import Button from "../atom/button";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "../../data/constants.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { SocialLoginType } from "../../types/SocialLoginType.ts";

const GoogleAuthButton = () => {
  const { redirectToAuthPage, loading } = useAuth();

  const handleLogin = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION,AUTH_ACTION.LOGIN);
    await redirectToAuthPage(SocialLoginType.GOOGLE);
  };

  return (
    <Button onClick={handleLogin} disabled={loading}>
      {loading ? "loading" : "구글로 로그인"}
    </Button>
  );
};

export default GoogleAuthButton;
