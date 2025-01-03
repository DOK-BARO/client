import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./_password_set.module.scss";
import useInput from "@/hooks/useInput.ts";
import { passwordValidation } from "@/validation/passwordValidation.ts";
import Input from "@/components/atom/Input/Input";
import {
  gray60,
} from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/Button/Button";
import { RegisterInfoType } from "@/types/UserType";
import { registerInfoAtom } from "@/store/userAtom";
import { Invisible } from "@/svg/Invisible";
import { Visible } from "@/svg/Visible";
import PasswordValidationMessage from "@/components/atom/PasswordValidationMessage/PasswordValidationMessage";
import PasswordMatchCheckMessage from "@/components/atom/PasswordMatchCheckMessage/PasswordMatchCheckMessage";

export default function PasswordSet({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const {
    value: password,
    onChange: onPasswordChange,
    isValid: isPasswordValid,
    validations: passwordValidations,
  } = useInput("", passwordValidation);
  const { value: passwordCheck, onChange: onPasswordCheckChange } =
    useInput("");

  const [user, setUser] = useAtom<RegisterInfoType>(registerInfoAtom);
  const [subStep, setSubStep] = useState<number>(1);
  const [isPasswordVisible, setIsPasswordVisibleCheck] =
    useState<boolean>(false);

  useEffect(() => {
    // 사용자가 뒤로가기 눌렀다 다시 돌아왔을 때 초기화되도록(비밀번호만)
    setUser({
      ...user,
      password: "",
    });
  }, []);

  const handleSubmit = (): void => {
    setUser({
      ...user,
      password,
    });
    setStep((prev) => prev + 1);
  };

  const moveToNext = (): void => {
    setSubStep(2);
  };

  const handleVisibleToggle = () => {
    setIsPasswordVisibleCheck((prev) => !prev);
  };

  const isPasswordMatched = password === passwordCheck && passwordCheck !== "";

  // TODO: isSuccess 추가하고 적용시키기

  return (
    <section className={styles["password-set"]}>
      <h3>비밀번호 입력</h3>
      <p className={styles["description"]}>
        로그인에 사용할
        <br />
        비밀번호를 입력해 주세요.
      </p>
      <Input
        type={isPasswordVisible ? "text" : "password"}
        isSuccess={isPasswordValid}
        message={<PasswordValidationMessage passwordValidations={passwordValidations}/>}
        rightIcon={
          <Button iconOnly onClick={handleVisibleToggle}>
            {isPasswordVisible ? (
              <Visible alt="비밀번호 표시 해제" stroke={gray60} width={24} />
            ) : (
              <Invisible alt="비밀번호 표시" stroke={gray60} width={24} />
            )}
          </Button>
        }
        id="password"
        className={styles.password}
        value={password}
        onChange={onPasswordChange}
        placeholder="비밀번호 입력"
        size="medium"
      />
      {subStep === 2 && (
        <>
          <p className={styles["password-check-desc"]}>
            비밀번호를 다시 한 번 입력해 주세요.
          </p>
          <Input
            id="password-check"
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            className={styles["password-check"]}
            placeholder="비밀번호를 다시 한 번 입력해 주세요."
            size="medium"
            type={isPasswordVisible ? "text" : "password"}
            rightIcon={
              <Button iconOnly onClick={handleVisibleToggle}>
                {isPasswordVisible ? (
                  <Visible
                    alt="비밀번호 표시 해제"
                    stroke={gray60}
                    width={24}
                  />
                ) : (
                  <Invisible alt="비밀번호 표시" stroke={gray60} width={24} />
                )}
              </Button>
            }
            isError={!isPasswordMatched && passwordCheck !== ""}
            isSuccess={isPasswordMatched}
            message={
              passwordCheck &&  <PasswordMatchCheckMessage isPasswordMatched={isPasswordMatched}/>
            }
          />
        </>
      )}
      <Button
        disabled={subStep === 1 ? !isPasswordValid : !isPasswordMatched}
        className={styles.next}
        size="medium"
        onClick={subStep === 1 ? moveToNext : handleSubmit}
        color="primary"
        fullWidth
      >
        다음
      </Button>
    </section>
  );
}
