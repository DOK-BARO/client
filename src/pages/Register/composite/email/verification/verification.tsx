// 공용으로 사용되는 스타일 (파일명 바꾸기?)

// import { useNavigate } from "react-router-dom";

import styles from "./_verification.module.scss";
import { Close } from "@/svg/close";
import { systemDanger } from "@/styles/abstracts/colors";
import { emailValidation } from "@/validation/emailValidation";
import { useAtom } from "jotai";
import useInput from "@/hooks/useInput.ts";
import Input from "@/components/atom/input/input.tsx";
import Button from "@/components/atom/button/button.tsx";
import { RegisterInfoType } from "@/types/UserType";
import { RegisterInfoAtom } from "@/store/userAtom";
import { useState } from "react";

export default function Verification() {
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);
  const {
    value: email,
    onChange: onEmailChange,
    isValid: isEmailValid,
  } = useInput(user.email, emailValidation);
  // const navigate = useNavigate();

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const onSubmit = (): void => {
    setUser({
      ...user,
      email,
    });
    setIsEmailSent(true); // navigate("/register/email/3");
  };

  return (
    <section className={styles["verification"]}>
      <h3>로그인 이메일 입력</h3>
      <p className={styles["description"]}>
        {!isEmailSent ? (
          <>
            로그인에 사용할
            <br />
            아이디(이메일)을 입력해 주세요.
          </>
        ) : (
          <>
            {user.email} 으로
            <br />
            인증 코드를 전송했어요.
          </>
        )}
      </p>
      {!isEmailSent ? (
        <Input
          message={
            isEmailValid === false ? (
              <span className={styles["message-container"]}>
                <p>옳지 않은 형식의 이메일입니다.</p>
                <Close stroke={systemDanger} width={20} height={20} />
              </span>
            ) : (
              <></>
            )
          }
          isError={isEmailValid === false ? true : undefined}
          id="email"
          className={styles.email}
          value={email}
          onChange={onEmailChange}
          placeholder="아이디(이메일) 입력"
          size="large"
        />
      ) : (
        <>인증코드 인풋</>
      )}
      <Button className={styles.next} size="medium" onClick={onSubmit}>
        다음
      </Button>
    </section>
  );
}
