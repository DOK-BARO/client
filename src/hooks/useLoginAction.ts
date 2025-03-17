import { isLoggedInAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import useLoginModal from "./useLoginModal";
import { loginRedirectUrlAtom } from "@/store/authModalAtom";
import { useEffect } from "react";

const useLoginAction = (redirectUrl?: string) => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const { openLoginModal } = useLoginModal();

  // 로그인 끝나고 redirect될 경로
  const [, setLoginRedirectUrl] = useAtom(loginRedirectUrlAtom);

  useEffect(() => {
    if (redirectUrl) {
      setLoginRedirectUrl(redirectUrl);
    }
  }, [redirectUrl]);

  const handleAuthenticatedAction = (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      openLoginModal();
    }
  };
  return { handleAuthenticatedAction };
};
export default useLoginAction;
