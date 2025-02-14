import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { isLoginModalOpenAtom } from "@/store/authModalAtom";

const useLoginModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useAtom(isLoginModalOpenAtom);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate(ROUTES.ROOT);
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
