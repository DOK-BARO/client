import styles from "./_start_auth_button.module.scss";
import Button from "@/components/atom/button/button.tsx";
import { IsEmailLoginPageAtom } from "@/store/authModalAtom.ts";
import { useAtom } from "jotai";

interface StartAuthButtonProps {
  isLoggedIn: boolean;
  openLoginModal: () => void;
}

export default function StartAuthButton({
  isLoggedIn,
  openLoginModal,
}: StartAuthButtonProps) {
  const [, setIsEmailLoginPage] = useAtom(IsEmailLoginPageAtom);

  if (isLoggedIn) {
    return null;
  }

  const handleClick = () => {
    setIsEmailLoginPage(false); // 초기화 후 모달 오픈
    openLoginModal();
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
    </div>
  );
}
