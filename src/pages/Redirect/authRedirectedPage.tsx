import { useAuthCode } from "../../hooks/useAuthCode.ts";
import { useParams } from "react-router-dom";

export default function AuthRedirectedPage() {
  const { provider } = useParams<{ provider: string }>();
  useAuthCode(provider!);
  return (
    <>
      잠시만 기다려주세요 (리다이렉트 중)
    </>
  );
}
