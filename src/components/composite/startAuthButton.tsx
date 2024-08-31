import styles from "../../styles/layout/_headerLayout.module.scss";
import LoginModal from "./loginModal.tsx";
import useModal from "../../hooks/useModal.ts";

function StartAuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();
  // TODO: function or const 논의하면 좋을듯
  
  if (isLoggedIn) {
    return null;
  }
  
  return (
    <div>
      <button className={styles["start-button"]} onClick={openLoginModal}>
            시작하기
      </button>

      {
        isLoginModalOpen &&
        <LoginModal closeModal={closeLoginModal}/>
      }
    </div>
  );
}

export default StartAuthButton;