import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { authService } from "@/services/server/authService";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useDebounce from "./useDebounce";

function useValidate({
  value,
  isEmailValid,
  code,
}: {
  value: string;
  isEmailValid: boolean | undefined;
  code: string;
}) {
  const [isEmailReadyToSend, setIsEmailReadyToSend] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);
  const [isAlreadyUsed, setIsAlreadyUsed] = useState<boolean>();
  const debouncedCode = useDebounce(code, 500);

  useEffect(() => {
    setIsEmailReadyToSend(true);
  }, [value]);

  useEffect(() => {
    if (debouncedCode.length === 6) {
      // console.log(debouncedCode);
      matchingEmailCode();
    } else {
      setIsMatch(undefined);
    }
  }, [debouncedCode]);

  const { mutate: sendEmailCode, error: sendEmailCodeError } = useMutation<
    void,
    ErrorType
  >({
    mutationFn: () => authService.sendEmailCode(value),
    onSuccess: () => {
      toast.success("인증 번호가 전송되었습니다.");
      setIsEmailSent(true);
    },

    onSettled: () => {
      setIsEmailReadyToSend(false);
    },
  });

  const { mutate: resendEmailCode } = useMutation({
    mutationFn: () => authService.resendEmailCode(value),
    onSuccess: () => {
      toast.success("인증 번호가 전송되었습니다.");
    },
  });

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

  const matchingEmailCode = () => {
    const emailAndCode = {
      email: value,
      code: code,
    };
    matchEmailCode(emailAndCode);
  };

  const getMessageContent = () => {
    if (isEmailValid === false) {
      return "옳지 않은 형식의 이메일입니다.";
    }
    if (!isEmailReadyToSend && sendEmailCodeError?.code === 400) {
      setIsAlreadyUsed(true);
      return "이미 사용중인 이메일입니다.";
    }
    return undefined;
  };

  const messageContent = getMessageContent();

  const isError =
    isEmailValid === false ||
    (!isEmailReadyToSend && sendEmailCodeError?.code === 400)
      ? true
      : undefined;

  const firstSendEmail = () => {
    if (!value || !isEmailValid) {
      return;
    }
    setIsEmailSent(true);

    sendEmailCode();
  };

  const resendEmail = () => {
    resendEmailCode();
  };

  return {
    messageContent,
    isError,
    isEmailSent,
    firstSendEmail,
    resendEmail,
    isMatch,
    matchingEmailCode,
    isAlreadyUsed,
  };
}

export default useValidate;
