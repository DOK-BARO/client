import styles from "./_header_util_area.module.scss";
import HeaderMyInfoUtilButton from "../HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "../HeaderQuizUtilButton/HeaderQuizUtilButton";
import useModal from "@/hooks/useModal";
import LoginModal from "../LoginModal/LoginModal";
import StartAuthButton from "../StartAuthButton/StartAuthButton";
import useLoginModal from "@/hooks/useLoginModal";

export default function HeaderUtilArea() {
  const { openModal: openLoginModal} = useModal();

  const { isLoginModalOpen, closeLoginModal } = useLoginModal();

  return (
    <span className={styles["header-util-area-container"]}>
      <HeaderQuizUtilButton openLoginModal={openLoginModal} />
      <HeaderMyInfoUtilButton />
      <StartAuthButton openLoginModal={openLoginModal} />
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
    </span>
  );
}
