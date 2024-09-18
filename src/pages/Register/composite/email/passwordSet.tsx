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
  systemSuccess,
} from "../../../../styles/abstracts/colors";
import { Invisible } from "../../../../../public/assets/svg/invisible";
export default function PasswordSet() {
  const { value: password, onChange: onPasswordChange } = useInput("");
  const { value: passwordCheck, onChange: onPasswordCheckChange } =
    useInput("");

  const isError: boolean = false;
  const isSuccess: boolean = true;
  const navigate = useNavigate();

  const onSubmit = (): void => {
    navigate("/register/email/3");
  };

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
        isSuccess={isSuccess}
        message={
          isSuccess ? (
            <div className={styles["message-container"]}>
              <span className={styles["icon-container"]}>
                대소문자
                <Check
                  width={20}
                  height={20}
                  stroke={!isSuccess ? gray40 : systemSuccess}
                />
              </span>
              <span className={styles["icon-container"]}>
                숫자
                <Check
                  width={20}
                  height={20}
                  stroke={!isSuccess ? gray40 : systemSuccess}
                />
              </span>
              <span className={styles["icon-container"]}>
                특수문자
                <Check
                  width={20}
                  height={20}
                  stroke={!isSuccess ? gray40 : systemSuccess}
                />
              </span>
              <span className={styles["icon-container"]}>
                8-20자 이내
                <Check
                  width={20}
                  height={20}
                  stroke={!isSuccess ? gray40 : systemSuccess}
                />
              </span>
            </div>
          ) : undefined
        }
        rightIcon={<Invisible stroke={gray60} width={24} />}
        isError={isError}
        id="password"
        className={styles.password}
        value={password}
        onChange={onPasswordChange}
        placeholder="비밀번호 입력"
        size="large"
      />
      {isSuccess && (
        <>
          <p className={styles["password-check-desc"]}>
            비밀번호를 다시 한 번 입력해 주세요.
          </p>
          <Input
            id="password-check"
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            placeholder="비밀번호를 다시 한 번 입력해 주세요."
            size="large"
            type="password"
            rightIcon={<Invisible stroke={gray60} width={24} />}
          />
        </>
      )}
      <Button
        disabled={false}
        // disabledBackground
        className={styles.next}
        size="medium"
        onClick={onSubmit}
      >
        다음
      </Button>
    </section>
  );
}
