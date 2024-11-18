import styles from "./_start_auth_button.module.scss";
import useModal from "@/hooks/useModal.ts";
import LoginModal from "../loginModal/loginModal.tsx";
import Button from "@/components/atom/button/button.tsx";

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
      <Button
        color="black"
        className={styles["start-button"]}
        onClick={openModal}
        size="small"
      >
        시작하기
      </Button>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </div>
  );
}
