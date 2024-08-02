import { useAuthCode } from "../../hooks/useAuthCode.ts";

export default function RedirectedPage() {
  useAuthCode();
  return (
    <>
      잠시만 기다려주세요 (리다이렉트 중)
    </>
  );
}
