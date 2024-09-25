import { useNavigate } from "react-router-dom";
import Button from "../../../../components/atom/button";
import Input from "../../../../components/atom/input";
import useInput from "../../../../hooks/useInput";

// 공용으로 사용되는 스타일 (파일명 바꾸기?)
import styles from "../../../../styles/composite/_password_set.module.scss";
import { Check } from "../../../../../public/assets/svg/check";
import {
  gray40,
  gray60,
  systemDanger,
  systemSuccess,
} from "../../../../styles/abstracts/colors";
import { Invisible } from "../../../../../public/assets/svg/invisible";
import { passwordValidation } from "../../../../validation/passwordValidation";
import { useEffect, useState } from "react";
import { Close } from "../../../../../public/assets/svg/close";

export default function PasswordSet() {
  const {
    value: password,
    onChange: onPasswordChange,
    isValid: isPasswordValid,
    validations: passwordValidations,
  } = useInput("", passwordValidation);
  const { value: passwordCheck, onChange: onPasswordCheckChange } =
    useInput("");

  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const onSubmit = (): void => {
    navigate("/register/email/3");
  };

  const moveToNext = (): void => {
    setStep(2);
  };

  useEffect(() => {
    setPasswordMatched(password === passwordCheck);
    if (!passwordCheck) {
      setPasswordMatched(undefined);
    }
  }, [passwordCheck]);

  // const passwordMatched: boolean = false;
  const [passwordMatched, setPasswordMatched] = useState<boolean | undefined>(
    undefined
  );

  return (
    <section className={styles["password-set"]}>
      <h3>비밀번호 입력</h3>
      <p className={styles["description"]}>
        로그인에 사용할
        <br />
        비밀번호를 입력해 주세요.
      </p>
      <Input
        type="password"
        isSuccess={isPasswordValid}
        message={
          <div className={styles["password-message-container"]}>
            {Object.entries(passwordValidations).map(([key, isValid]) => (
              <span key={key} className={styles["icon-container"]}>
                <p style={{ color: !isValid ? gray40 : systemSuccess }}>
                  {key}
                </p>
                <Check
                  width={20}
                  height={20}
                  stroke={!isValid ? gray40 : systemSuccess}
                />
              </span>
            ))}
          </div>
        }
        rightIcon={<Invisible stroke={gray60} width={24} />}
        id="password"
        className={styles.password}
        value={password}
        onChange={onPasswordChange}
        placeholder="비밀번호 입력"
        size="large"
      />
      {step === 2 && (
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
            size="large"
            type="password"
            rightIcon={<Invisible stroke={gray60} width={24} />}
            isError={!passwordMatched}
            isSuccess={passwordMatched}
            message={
              passwordMatched !== undefined ? (
                <span className={styles["password-check-message-container"]}>
                  <p>{passwordMatched ? "비밀번호 일치" : "비밀번호 불일치"}</p>
                  {passwordMatched ? (
                    <Check stroke={systemSuccess} width={20} height={20} />
                  ) : (
                    <Close stroke={systemDanger} width={20} height={20} />
                  )}
                </span>
              ) : (
                <></>
              )
            }
          />
        </>
      )}
      <Button
        disabled={!isPasswordValid}
        className={styles.next}
        size="medium"
        onClick={step === 1 ? moveToNext : onSubmit}
      >
        다음
      </Button>
    </section>
  );
}
