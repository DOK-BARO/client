import styles from "./_header_util_area.module.scss";
import HeaderMyInfoUtilButton from "../HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "../HeaderQuizUtilButton/HeaderQuizUtilButton";
import useModal from "@/hooks/useModal";
import LoginModal from "../LoginModal/LoginModal";
import { UserType } from "@/types/UserType";
import StartAuthButton from "../StartAuthButton/StartAuthButton";

interface Props {
  isLoggedIn: boolean;
  currentUser: UserType | null;
}

export default function HeaderUtilArea({ isLoggedIn, currentUser }: Props) {
  const {
    isModalOpen: isLoginModalOpen,
    closeModal: closeLoginModal,
    openModal: openLoginModal,
  } = useModal();

  return (
    <span className={styles["header-util-area-container"]}>
      <HeaderQuizUtilButton openLoginModal={openLoginModal} />
      <HeaderMyInfoUtilButton
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <StartAuthButton
        isLoggedIn={isLoggedIn}
        openLoginModal={openLoginModal}
      />
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
    </span>
  );
}
