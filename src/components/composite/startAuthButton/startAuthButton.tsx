import styles from "./_start_auth_button.module.scss";
import useModal from "@/hooks/useModal.ts";
import LoginModal from "../loginModal/loginModal.tsx";

type Props = {
  isLoggedIn: boolean;
};

export default function StartAuthButton({ isLoggedIn }: Props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  if (isLoggedIn) {
    return null;
  }

  return (
    <div>
      <button className={styles["start-button"]} onClick={openModal}>
        시작하기
      </button>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </div>
  );
}
