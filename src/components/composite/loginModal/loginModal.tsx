import styles from "./_login_modal.module.scss";
import React, { useState } from "react";
import { SOCIAL_TYPES } from "@/data/constants.ts";
import SocialAuthButton from "../socialAuthButton/socialAuthButton.tsx";
import { AuthType } from "@/types/AuthType.ts";
import HeaderLogo from "@/components/atom/headerLogo/headerLogo.tsx";
import Modal from "@/components/atom/modal/modal.tsx";
import Input from "@/components/atom/input/input.tsx";
import { Visible } from "@/svg/visible.tsx";
import { gray60, systemDanger } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/button/button.tsx";
import { Kakao } from "@/svg/auth/kakao.tsx";
import { Google } from "@/svg/auth/google.tsx";
import { Naver } from "@/svg/auth/naver.tsx";
import { Github } from "@/svg/auth/github.tsx";
import useInput from "@/hooks/useInput.ts";
import { Check } from "@/svg/check.tsx";
interface LoginModalProps {
  closeModal: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const [isEmailSelected, setIsEmailSelected] = useState<boolean>(false);
  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

  const { value: email, onChange: onEmailChange } = useInput("");
  const { value: password, onChange: onPasswordChange } = useInput("");

  const socialLoginMethodButtonImage = [
    <Github width={32} height={32} alt="깃허브" key="github" />,
    <Google width={32} height={32} alt="구글" key="google" />,
    <Kakao width={32} height={32} alt="카카오" key="kakao" />,
    <Naver width={32} height={32} alt="네이버" key="naver" />,
  ];
  return (
    <Modal
      className={styles["auth-modal"]}
      content={
        <>
          <header className={styles.header}>
            <HeaderLogo />
            <span className={styles.description}>
              개발자를 위한 똑바로 된 독서 방법
            </span>
          </header>
          <main
            className={styles[`main${!isEmailSelected ? "" : "-email-login"}`]}
          >
            {!isEmailSelected ? (
              SOCIAL_TYPES.map((socialType) => (
                <SocialAuthButton
                  key={socialType}
                  authType={AuthType.LOGIN}
                  socialType={socialType}
                  setIsEmailSelected={setIsEmailSelected}
                />
              ))
            ) : (
              <>
                <Input
                  fullWidth
                  id="email"
                  value={email}
                  placeholder="이메일을 입력해주세요"
                  label="이메일"
                  onChange={onEmailChange}
                />
                <Input
                  fullWidth
                  id="password"
                  type="password"
                  value={password}
                  placeholder="비밀번호를 입력해주세요"
                  label="비밀번호"
                  onChange={onPasswordChange}
                  rightIcon={
                    <Visible
                      alt="비밀번호 표시 해제"
                      stroke={gray60}
                      width={24}
                      height={24}
                    />
                  }
                  rightLabel={
                    <Button
                      color="transparent"
                      className={styles["find-password"]}
                    >
                      비밀번호 찾기
                    </Button>
                  }
                />
                <Button
                  color="primary"
                  size="small"
                  fullWidth
                  disabled={!isInputFilled}
                >
                  로그인
                </Button>
                <span className={styles["divider-container"]}>
                  <div className={styles.line} />
                  <p className={styles.text}>또는</p>
                  <div className={styles.line} />
                </span>
                <section
                  aria-label="소셜로 로그인하기"
                  className={styles["social-login-buttons"]}
                >
                  {socialLoginMethodButtonImage.map((socialImage) => (
                    <Button
                      iconOnly
                      className={styles[`${socialImage.key}-button`]}
                    >
                      {socialImage}
                    </Button>
                  ))}
                </section>
              </>
            )}
          </main>
        </>
      }
      closeModal={closeModal}
    />
  );
};

export default LoginModal;
