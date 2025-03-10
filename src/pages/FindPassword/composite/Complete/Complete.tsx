import Button from "@/components/atom/Button/Button";
import styles from "./_complete.module.scss";
import { useAtom } from "jotai";
import { isEmailLoginPageAtom } from "@/store/authModalAtom";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import { findPasswordEmailAtom } from "@/store/userAtom";

export default function Complete() {
  const [findPasswordEmail] = useAtom(findPasswordEmailAtom);

  const [, setIsEmailLoginPage] = useAtom(isEmailLoginPageAtom);
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();

  const handleLoginClick = () => {
    setIsEmailLoginPage(true);
    openLoginModal();
  };
  const handleResendEmail = () => {};

  return (
    <section className={styles.complete}>
      {isLoginModalOpen ? <LoginModal closeModal={closeLoginModal} /> : null}
      <h3>임시 비밀번호 발송 완료</h3>
      <p className={styles.description}>
        {findPasswordEmail}
        <br />로 임시 비밀번호를 발송했어요.
      </p>
      <p className={styles["sub-description"]}>
        발급된 임시 비밀번호는 보안을 위해
        <br />
        마이페이지에서 새로운 비밀번호로 변경해 주세요.
      </p>
      <Button
        className={styles["login-button"]}
        fullWidth
        color="primary"
        onClick={handleLoginClick}
      >
        다시 로그인하기
      </Button>
      <Button
        color="transparent"
        className={styles["resend-button"]}
        onClick={handleResendEmail}
      >
        이메일 재전송하기
      </Button>
    </section>
  );
}
