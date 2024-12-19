// 공용으로 사용되는 스타일 (파일명 바꾸기?)
import styles from "./_verification.module.scss";
import { systemDanger } from "@/styles/abstracts/colors";
import { emailValidation } from "@/validation/emailValidation";
import { useAtom } from "jotai";
import useInput from "@/hooks/useInput.ts";
import Input from "@/components/atom/input/input.tsx";
import Button from "@/components/atom/button/button.tsx";
import { RegisterInfoType } from "@/types/UserType";
import { registerInfoAtom } from "@/store/userAtom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { XSmall } from "@/svg/xSmall";
import AuthCodeInput from "@/components/composite/authCodeInput/AuthCodeInput";
import { authService } from "@/services/server/authService";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";

export default function Verification({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [user, setUser] = useAtom<RegisterInfoType>(registerInfoAtom);
  const {
    value: email,
    onChange: onEmailChange,
    isValid: isEmailValid,
  } = useInput(user.email, emailValidation);

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const fullCode: string = code.join("");

  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isEmailReadyToSend, setIsEmailReadyToSend] = useState<boolean>(false);

  useEffect(() => {
    setIsEmailReadyToSend(true);
  }, [email]);

  const { mutate: sendEmailCode, error: sendEmailCodeError } = useMutation<
    void,
    ErrorType
  >({
    mutationFn: () => authService.sendEmailCode(email),
    onSuccess: () => {
      toast.success("인증 번호가 전송되었습니다.");
      setIsEmailSent(true);
    },

    onSettled: () => {
      setIsEmailReadyToSend(false);
    },
    onError: () => {
      // 전역 설정된 토스트 알림을 띄우지 않기 위함
    },
  });

  const { mutate: resendEmailCode } = useMutation({
    mutationFn: () => authService.resendEmailCode(email),
    // onError 시 토스트 알람 처리는 전역에서 설정
    onSuccess: () => {
      toast.success("인증 번호가 전송되었습니다.");
    },
  });

  // 인증코드 발송
  const handleNext = () => {
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

  // 이메일 인증코드 재전송
  const handleResend = () => {
    resendEmailCode();
  };

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setIsMatch(undefined);
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
    // 인증 코드가 일치할 경우에만 다음 스텝으로 이동
    setStep((prev) => prev + 1);
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
  const { mutate: matchEmailCode } = useMutation<
    { result: boolean } | null,
    ErrorType,
    { email: string; code: string }
  >({
    mutationFn: (emailAndCode) => authService.matchEmailCode(emailAndCode),
    onSettled: (data) => {
      const matchResult = data?.result ?? false;
      setIsMatch(matchResult);
    },
  });

  const handleDone = () => {
    const emailAndCode = {
      email,
      code: fullCode,
    };
    matchEmailCode(emailAndCode);
  };

  const getMessageContent = () => {
    if (isEmailValid === false) {
      return "옳지 않은 형식의 이메일입니다.";
    }
    if (!isEmailReadyToSend && sendEmailCodeError?.code === 400) {
      return "이미 사용중인 이메일입니다.";
    }
    return undefined;
  };

  const messageContent = getMessageContent();

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
            messageContent ? (
              <span className={styles["message-container"]}>
                <XSmall stroke={systemDanger} width={20} height={20} />
                <p>{messageContent}</p>
              </span>
            ) : undefined
          }
          fullWidth
          color={isEmailValid ? "black" : "default"}
          isError={
            isEmailValid === false ||
            (!isEmailReadyToSend && sendEmailCodeError?.code === 400)
              ? true
              : undefined
          }
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="아이디(이메일) 입력"
          size="medium"
        />
      ) : (
        <AuthCodeInput
          code={code}
          borderColor={fullCode.length !== 6 ? "default" : "black"}
          handleCodeChange={handleCodeChange}
          handleKeyDown={handleKeyDown}
          isMatch={isMatch ?? true}
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
      <Button
        color="transparent"
        size="xsmall"
        className={styles.resend}
        onClick={handleResend}
        disabled={!isEmailSent}
      >
        이메일 재전송하기
      </Button>
    </section>
  );
}
