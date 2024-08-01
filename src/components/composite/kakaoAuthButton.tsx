import { useKakaoAuth } from "../../hooks/useKakaoAuth";
import Button from "../atom/button";

const KakaoAuthButton = () => {
  const { redirectToKakaoAuth, loading } = useKakaoAuth();

  const handleLogin = async () => {
    localStorage.setItem("authAction","login");
    await redirectToKakaoAuth();
  };

  return (
    <Button onClick={handleLogin} disabled={loading}>
      {loading ? "loading" : "카카오로 로그인"}
    </Button>
  );
};

export default KakaoAuthButton;
