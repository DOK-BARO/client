import Button from "@/components/atom/button/button";
import Input from "@/components/atom/input/input";
import styles from "./_send_temporary_password.module.scss";
import useInput from "@/hooks/useInput";
import { XSmall } from "@/svg/xSmall";
import { systemDanger } from "@/styles/abstracts/colors";
import { Dispatch } from "react";
import { SetStateAction } from "jotai";
import { authService } from "@/services/server/authService";

export default function SendTemporaryPassword({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authService.issueTempPassword(email);
    setStep((prev) => prev + 1);
  };
  const { value: email, onChange: onEmailChange } = useInput("");
  return (
    <section className={styles["send-temporary-password"]}>
      <h3>임시 비밀번호 발송</h3>
      <p className={styles.description}>
        가입 시 등록한 이메일 주소를 입력해 주세요.
        <br />
        임시 비밀번호를 보내드려요.
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          onChange={onEmailChange}
          value={email}
          placeholder="이메일을 입력해주세요"
          isError
          message={
            <span className={styles["message-container"]}>
              <XSmall stroke={systemDanger} width={20} height={20} />
              <p>회원 정보가 없습니다.</p>
            </span>
          }
        />
        <Button
          className={styles["send-temporary-password-button"]}
          fullWidth
          disabled={!email}
          color="primary"
          type="submit"
        >
          임시 비밀번호 발송
        </Button>
      </form>
    </section>
  );
}
