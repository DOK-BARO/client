import styles from "./_header_util_area.module.scss";
import HeaderMyInfoUtilButton from "../headerMyInfoUtilButton/headerMyInfoUtilButton";
import HeaderQuizUtilButton from "../headerQuizUtilButton/headerQuizUtilButton";
import StartAuthButton from "../startAuthButton/startAuthButton";
import useModal from "@/hooks/useModal";
import LoginModal from "../loginModal/loginModal";

interface HeaderUtilAreaProps {
  isLoggedIn: boolean;
}

export default function HeaderUtilArea({ isLoggedIn }: HeaderUtilAreaProps) {
  const {
    isModalOpen: isLoginModalOpen,
    closeModal: closeLoginModal,
    openModal: openLoginModal,
  } = useModal();

  return (
    <span className={styles["header-util-area-container"]}>
      <HeaderQuizUtilButton openLoginModal={openLoginModal} />
      <HeaderMyInfoUtilButton isLoggedIn={isLoggedIn} />
      <StartAuthButton
        isLoggedIn={isLoggedIn}
        openLoginModal={openLoginModal}
      />
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
    </span>
  );
}
