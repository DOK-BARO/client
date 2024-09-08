import styles from "../../styles/components/_start_auth_button.module.scss";
import LoginModal from "./loginModal.tsx";
import useModal from "../../hooks/useModal.ts";

type Props = {
  isLoggedIn: boolean
}

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
      {isModalOpen && <LoginModal closeModal={closeModal}/>}
    </div>
  );
}