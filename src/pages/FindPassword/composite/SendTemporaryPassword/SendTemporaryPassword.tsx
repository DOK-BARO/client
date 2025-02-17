import Button from "@/components/atom/Button/Button";
import Input from "@/components/atom/Input/Input";
import styles from "./_send_temporary_password.module.scss";
import useInput from "@/hooks/useInput";
import { XSmall } from "@/svg/XSmall";
import { systemDanger } from "@/styles/abstracts/colors";
import { Dispatch, useEffect, useState } from "react";
import { SetStateAction, useAtom } from "jotai";
import { authService } from "@/services/server/authService";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { findPasswordEmailAtom } from "@/store/userAtom";
interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}
export default function SendTemporaryPassword({ setStep }: Props) {
  const { value: email, onChange: onEmailChange } = useInput("");
  const [isEmailReadyToSend, setIsEmailReadyToSend] = useState<boolean>(false);
  const [, setFindPasswordEmail] = useAtom(findPasswordEmailAtom);

  const { mutate: issueTempPassword } = useMutation<void, ErrorType, string>({
    mutationFn: () => authService.issueTempPassword(email),
    onSuccess: () => {
      setStep((prev) => prev + 1);
      setFindPasswordEmail(email);
    },
    onError: () => {
      // 전역 에러 토스트 안나게 하기 위함
      // console.error(error)
      setIsEmailReadyToSend(false);
    },
  });

  useEffect(() => {
    if (!isEmailReadyToSend) {
      setIsEmailReadyToSend(true);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    issueTempPassword(email);
  };

  return (
    <section className={styles["send-temporary-password"]}>
      <h3 className={styles["sr-only"]}>임시 비밀번호 발송</h3>
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
            !isEmailReadyToSend ? (
              <span className={styles["message-container"]}>
                <XSmall stroke={systemDanger} width={20} height={20} />
                <p>회원 정보가 없습니다.</p>
              </span>
            ) : undefined
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
