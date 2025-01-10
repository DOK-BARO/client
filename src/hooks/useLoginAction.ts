import { isLoggedInAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import useLoginModal from "./useLoginModal";

const useLoginAction = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const { handleGoToLogin } = useLoginModal();

  const handleAuthenticatedAction = (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      handleGoToLogin();
    }
  }
  return { handleAuthenticatedAction };
}
export default useLoginAction;