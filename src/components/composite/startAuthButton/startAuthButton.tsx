import styles from "./_start_auth_button.module.scss";
import useModal from "@/hooks/useModal.ts";
import LoginModal from "../loginModal/loginModal.tsx";
import Button from "@/components/atom/button/button.tsx";
import { IsEmailLoginPage } from "@/store/authModalAtom.ts";
import { useAtom } from "jotai";

type Props = {
  isLoggedIn: boolean;
};

export default function StartAuthButton({ isLoggedIn }: Props) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [, setIsEmailLoginPage] = useAtom(IsEmailLoginPage);

  if (isLoggedIn) {
    return null;
  }

  const handleClick = () => {
    setIsEmailLoginPage(false); // 초기화 후 모달 오픈
    openModal();
  };

  return (
    <div>
      <Button
        color="black"
        className={styles["start-button"]}
        onClick={handleClick}
        size="small"
      >
        시작하기
      </Button>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </div>
  );
}
