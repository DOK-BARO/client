import styles from "./_start_auth_button.module.scss";
import Button from "@/components/atom/Button/Button";
import { isEmailLoginPageAtom } from "@/store/authModalAtom.ts";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom";
import useLoginModal from "@/hooks/useLoginModal";

export default function StartAuthButton() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const { openLoginModal } = useLoginModal();

  const [, setIsEmailLoginPage] = useAtom(isEmailLoginPageAtom);

  if (isLoggedIn) {
    return null;
  }

  const handleClick = () => {
    setIsEmailLoginPage(false); // 초기화 후 모달 오픈
    openLoginModal();
  };

  return (
    <Button
      color="black"
      className={styles["start-button"]}
      onClick={handleClick}
      size="small"
    >
      시작하기
    </Button>
  );
}
