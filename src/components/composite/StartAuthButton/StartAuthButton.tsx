import styles from "./_start_auth_button.module.scss";
import Button from "@/components/atom/Button/Button";
import { isEmailLoginPageAtom } from "@/store/authModalAtom.ts";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom";

export default function StartAuthButton({
  openLoginModal,
}: {openLoginModal: () => void;}) {
		const [isLoggedIn] = useAtom(isLoggedInAtom);

  const [, setIsEmailLoginPage] = useAtom(isEmailLoginPageAtom);

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
