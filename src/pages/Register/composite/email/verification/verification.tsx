// 공용으로 사용되는 스타일 (파일명 바꾸기?)
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
import axios from "axios";

export default function Verification() {
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);
  const {
    value: email,
    onChange: onEmailChange,
    isValid: isEmailValid,
  } = useInput(user.email, emailValidation);
  // const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
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
      // axios 타입으로 바꾸기
      // if (response.status === 201) {
      //   console.log(response);
      //   navigate("/register/email/3");
      // }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
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
              className={styles.input}
            />
          ))}
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
