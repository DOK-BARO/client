import Button from "@/components/atom/button/button";
import styles from "./_complete.module.scss";
import { useAtom } from "jotai";
import { IsEmailLoginPageAtom } from "@/store/authModalAtom";
import useModal from "@/hooks/useModal";
import LoginModal from "@/components/composite/loginModal/loginModal";

export default function Complete() {
  const emailAddress = "dokbaro@gmail.com";
  const [, setIsEmailLoginPage] = useAtom(IsEmailLoginPageAtom);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleLoginClick = () => {
    setIsEmailLoginPage(true);
    openModal();
  };
  const handleResendEmail = () => {};
  return (
    <section className={styles.complete}>
      {isModalOpen ? <LoginModal closeModal={closeModal} /> : null}
      <h3>임시 비밀번호 발송 완료</h3>
      <p className={styles.description}>
        {emailAddress}s
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
