import styles from "./_header_util_area.module.scss";
import HeaderMyInfoUtilButton from "../HeaderMyInfoUtilButton/HeaderMyInfoUtilButton";
import HeaderQuizUtilButton from "../HeaderQuizUtilButton/HeaderQuizUtilButton";
import LoginModal from "../LoginModal/LoginModal";
import StartAuthButton from "../StartAuthButton/StartAuthButton";
import useLoginModal from "@/hooks/useLoginModal";

export default function HeaderUtilArea() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();

  return (
    <span className={styles["header-util-area-container"]}>
      <HeaderQuizUtilButton />
      <HeaderMyInfoUtilButton />
      <StartAuthButton />
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
    </span>
  );
}
