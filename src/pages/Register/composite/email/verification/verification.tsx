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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { XSmall } from "@/svg/xSmall";

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

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const onNext = (): void => {
    if (!email || !isEmailValid) {
      return;
    }
    setUser({
      ...user,
      email,
    });
    // 인증코드 발송
    sendEmailCode();
  };

  const onCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if (value.length > 1) return;
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

  // 이메일로 인증코드 보내기
  const sendEmailCode = async () => {
    console.log(email);
    try {
      const response = await axios.post("/email-authentications", {
        email: email,
      });
      // axios 타입으로 바꾸기
      if (response.status === 201) {
        console.log(response);
        setIsEmailSent(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const matchEmailCode = async () => {
    try {
      const response = await axios.post("/email-authentications/match-code", {
        email: email,
        code: code,
      });
      // navigate("/register/email/3");
      // axios 타입으로 바꾸기
      if (response.status === 201) {
        console.log(response);
        setIsMatch(true);
      }
      console.log("response", response);
    } catch (e) {
      // 인증코드가 일치하지 않을 경우
      // TODO: 상세한 에러 처리 필요
      console.error("에러", e);
      setIsMatch(false);
    }
  };

  useEffect(() => {
    if (isMatch) {
      // 인증 코드가 일치할 경우에만 다음 페이지로 이동
      navigate("/register/email/3");
    }
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

  const onDone = () => {
    matchEmailCode();
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
        <div className={styles["code-input-message-container"]}>
          <div className={styles["code-input-container"]}>
            {code.map((digit, i) => (
              <Input
                size="large"
                key={i}
                id={`code-input-${i}`}
                value={digit}
                onChange={(e) => onCodeChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                maxLength={1}
                color={fullCode.length !== 6 ? "default" : "black"}
                isError={isMatch === false}
              />
            ))}
          </div>
          {isMatch === false ? (
            <span className={styles["message-container"]}>
              <p>인증 코드가 일치하지 않습니다.</p>
              <XSmall stroke={systemDanger} width={20} height={20} />
            </span>
          ) : (
            <></>
          )}
        </div>
      )}
      <Button
        className={styles.next}
        color="primary"
        size="medium"
        onClick={!isEmailSent ? onNext : onDone}
        fullWidth
        disabled={!isEmailSent ? !isEmailValid : fullCode.length !== 6}
      >
        {!isEmailSent ? <>다음</> : <>인증하기</>}
      </Button>
    </section>
  );
}
