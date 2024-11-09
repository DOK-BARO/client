// 공용으로 사용되는 스타일 (파일명 바꾸기?)
import styles from "./_verification.module.scss";
import { systemDanger } from "@/styles/abstracts/colors";
import { emailValidation } from "@/validation/emailValidation";
import { useAtom } from "jotai";
import useInput from "@/hooks/useInput.ts";
import Input from "@/components/atom/input/input.tsx";
import Button from "@/components/atom/button/button.tsx";
import { RegisterInfoType } from "@/types/UserType";
import { RegisterInfoAtom } from "@/store/userAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XSmall } from "@/svg/xSmall";
import { matchEmailCode, sendEmailCode } from "@/services/server/authService";
import AuthCodeInput from "@/components/composite/authCodeInput/AuthCodeInput";

export default function Verification() {
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);
  const {
    value: email,
    onChange: onEmailChange,
    isValid: isEmailValid,
  } = useInput(user.email, emailValidation);

  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);
  const fullCode: string = code.join("");
  const nextPage = "/register/email/3";

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleNext = async () => {
    if (!email || !isEmailValid) {
      return;
    }
    setUser({
      ...user,
      email,
    });
    // 인증코드 발송
    await sendEmailCode(email);
    setIsEmailSent(true);
  };

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let { value } = e.target;
    if (value.length > 1) return;

    value = value.toUpperCase();

    const newCode = [...code];

    if (value) {
      newCode[index] = value;
      setCode(newCode);

      // 다음 인풋으로 포커스
      if (index < 5) {
        setTimeout(() => {
          const nextInput = document.getElementById(`code-input-${index + 1}`);
          if (nextInput) {
            (nextInput as HTMLInputElement).focus();
          }
        }, 0);
      }
    } else {
      newCode[index] = "";
      setCode(newCode);

      // 이전 인풋으로 포커스
      if (index > 0) {
        setTimeout(() => {
          const prevInput = document.getElementById(`code-input-${index - 1}`);
          if (prevInput) {
            (prevInput as HTMLInputElement).focus();
          }
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (!isMatch) {
      return;
    }
    // 인증 코드가 일치할 경우에만 다음 페이지로 이동
    navigate(nextPage);
  }, [isMatch]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        setTimeout(() => {
          const prevInput = document.getElementById(`code-input-${index - 1}`);
          if (prevInput) {
            (prevInput as HTMLInputElement).focus();
          }
        }, 0);
      }
    }
  };

  const handleDone = async () => {
    const { result } = await matchEmailCode({ email, code: fullCode });
    if (!result) {
      return;
    }
    setIsMatch(true);
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
                <XSmall stroke={systemDanger} width={20} height={20} />
              </span>
            ) : (
              <></>
            )
          }
          fullWidth
          color={isEmailValid ? "black" : "default"}
          isError={isEmailValid === false ? true : undefined}
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="아이디(이메일) 입력"
          size="large"
        />
      ) : (
        <AuthCodeInput
          code={code}
          borderColor={fullCode.length !== 6 ? "default" : "black"}
          handleCodeChange={handleCodeChange}
          handleKeyDown={handleKeyDown}
          isMatch
        />
      )}
      <Button
        className={styles.next}
        color="primary"
        size="medium"
        onClick={!isEmailSent ? handleNext : handleDone}
        fullWidth
        disabled={!isEmailSent ? !isEmailValid : fullCode.length !== 6}
      >
        {!isEmailSent ? <>다음</> : <>인증하기</>}
      </Button>
    </section>
  );
}
