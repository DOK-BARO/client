import { useKakaoAuth } from "../../hooks/useKakaoAuth";
import Button from "../atom/button";
import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "../../data/constants.ts";

const KakaoAuthButton = () => {
  const { redirectToKakaoAuth, loading } = useKakaoAuth();

  const handleLogin = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION,AUTH_ACTION.LOGIN);
    await redirectToKakaoAuth();
  };

  return (
    <Button onClick={handleLogin} disabled={loading}>
      {loading ? "loading" : "카카오로 로그인"}
    </Button>
  );
};

export default KakaoAuthButton;
