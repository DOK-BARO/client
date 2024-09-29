import { useNavigate } from "react-router-dom";
import Button from "../../../../components/atom/button";
import Input from "../../../../components/atom/input";
import useInput from "../../../../hooks/useInput";

// 공용으로 사용되는 스타일 (파일명 바꾸기?)
import styles from "../../../../styles/composite/_email_verification.module.scss";
import { Close } from "../../../../../public/assets/svg/close";
import { systemDanger } from "../../../../styles/abstracts/colors";
import { emailValidation } from "../../../../validation/emailValidation";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store/userAtom";
import { User } from "../../../../types/User";

export default function EmailVerification() {
  const [user, setUser] = useAtom<User>(userAtom);
  const {
    value: email,
    onChange: onEmailChange,
    isValid: isEmailValid,
  } = useInput(user.email, emailValidation);
  const navigate = useNavigate();

  const onSubmit = (): void => {
    setUser({
      ...user,
      email,
    });
    navigate("/register/email/3");
  };

  return (
    <section className={styles["email-verification"]}>
      <h3>로그인 이메일 입력</h3>
      <p className={styles["description"]}>
        로그인에 사용할
        <br />
        아이디(이메일)을 입력해 주세요.
      </p>
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
      <Button className={styles.next} size="medium" onClick={onSubmit}>
        다음
      </Button>
    </section>
  );
}
