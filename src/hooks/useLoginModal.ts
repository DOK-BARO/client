import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import {
  closeLoginModalAndNavigateToRootAtom,
  isLoginModalOpenAtom,
} from "@/store/authModalAtom";

const useLoginModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useAtom(isLoginModalOpenAtom);
  const [
    closeLoginModalAndNavigateToRoot,
    setCloseLoginModalAndNavigateToRoot,
  ] = useAtom(closeLoginModalAndNavigateToRootAtom);
  const navigate = useNavigate();

  const openLoginModal = () => setLoginModalOpen(true);

  const closeLoginModal = () => {
    if (closeLoginModalAndNavigateToRoot) {
      navigate(ROUTES.ROOT);
      setCloseLoginModalAndNavigateToRoot(false);
    }

    setLoginModalOpen(false);
  };

  const handleGoToLogin = () => {
    navigate(ROUTES.ROOT); //TODO: 랜딩페이지로 이동
    openLoginModal();
  };

  return {
    isLoginModalOpen,
    closeLoginModal,
    handleGoToLogin,
    openLoginModal,
  };
};

export default useLoginModal;
