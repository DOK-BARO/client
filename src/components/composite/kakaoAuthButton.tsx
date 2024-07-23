import { useKakaoAuth } from "../../hooks/useKakaoAuth";
import Button from "../atom/button";

const KakaoAuthButton = () => {
  const { redirectToKakaoAuth, loading } = useKakaoAuth();
  return (
    <Button onClick={redirectToKakaoAuth} disabled={loading}>
      {loading ? "loading" : "카카오로 로그인"}
    </Button>
  );
};

export default KakaoAuthButton;
