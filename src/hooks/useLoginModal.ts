import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { isLoginModalOpenAtom } from "@/store/authModalAtom";
// TODO 로그인모달 로직을 대체 해야함
const useLoginModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useAtom(isLoginModalOpenAtom);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate(ROUTES.ROOT); //TODO: 랜딩페이지로 이동
    openLoginModal();
  };

  return {
    openLoginModal,
    isLoginModalOpen,
    closeLoginModal,
    handleGoToLogin,
  };
}
export default useLoginModal;