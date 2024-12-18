import styles from "./_login_modal.module.scss";
import React, { useEffect, useState } from "react";
import { SOCIAL_TYPES } from "@/data/constants.ts";
import SocialAuthButton from "../socialAuthButton/socialAuthButton.tsx";
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
import { XSmall } from "@/svg/xSmall.tsx";
import { Invisible } from "@/svg/invisible.tsx";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isEmailLoginPageAtom } from "@/store/authModalAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType.ts";
import toast from "react-hot-toast";
// import { CurrentUserAtom } from "@/store/userAtom.ts";
interface LoginModalProps {
  closeModal: () => void;
}

const socialLoginMethodButtonImage = [
  <Github width={32} height={32} alt="깃허브" key="github" />,
  <Google width={32} height={32} alt="구글" key="google" />,
  <Kakao width={32} height={32} alt="카카오" key="kakao" />,
  <Naver width={32} height={32} alt="네이버" key="naver" />,
];

const LoginModal = ({ closeModal }: LoginModalProps) => {
  // TODO: 전역으로 상태 변경할 수 있도록 해야함
  // const [isEmailSelected, setIsEmailSelected] = useState<boolean>(false);
  // const [, setCurrentUser] = useAtom(CurrentUserAtom);
  const [isEmailLoginPage] = useAtom(isEmailLoginPageAtom);
  const navigate = useNavigate();

  const { value: email, onChange: onEmailChange } = useInput("");
  const { value: password, onChange: onPasswordChange } = useInput("");

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isInputFilled = email && password;

  const [isMatched, setIsMatched] = useState<boolean>(true);
  const [isReadyToLogin, setIsReadyToLogin] = useState<boolean>(false);

  const handlePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const { mutate: emailLogin } = useMutation<
    void,
    ErrorType,
    { email: string; password: string }
  >({
    mutationFn: (loginInfo) => authService.emailLogin(loginInfo),
    onSuccess: () => {
      toast.success("로그인이 완료되었습니다.");
      // const currentUser = await authService.fetchUser();
      // if (currentUser) {
      //   setCurrentUser(currentUser);
      // }
      closeModal();
      navigate("/");
    },
    onError: () => {
      setIsMatched(false);
    },
    onSettled: () => {
      setIsReadyToLogin(false);
    },
  });

  useEffect(() => {
    if (!isReadyToLogin) {
      setIsReadyToLogin(true);
    }
  }, [email, password]);

  // 로그인
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginInfo = { email, password };
    emailLogin(loginInfo);
  };

  const handleSignupClick = () => {
    closeModal();
    navigate("/register/email");
  };

  const handleFindPasswordClick = () => {
    closeModal();
    navigate("/find-password");
  };

  return (
    <Modal
      width={390}
      contents={[
        {
          title: "",
          content: (
            <>
              <header className={styles.header}>
                <HeaderLogo />
                <span className={styles.description}>
                  개발자를 위한 똑바로 된 독서 방법
                </span>
              </header>
              <main
                className={
                  styles[`main${!isEmailLoginPage ? "" : "-email-login"}`]
                }
              >
                {!isEmailLoginPage ? (
                  SOCIAL_TYPES.map((socialType) => (
                    <SocialAuthButton
                      key={socialType}
                      socialType={socialType}
                    />
                  ))
                ) : (
                  <form
                    className={styles["login-form"]}
                    onSubmit={handleSubmit}
                  >
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
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      placeholder="비밀번호를 입력해주세요"
                      label="비밀번호"
                      onChange={onPasswordChange}
                      rightIcon={
                        <Button
                          onClick={handlePasswordVisible}
                          iconOnly
                          icon={
                            isPasswordVisible ? (
                              <Visible
                                alt="비밀번호 표시 해제"
                                stroke={gray60}
                                width={24}
                                height={24}
                              />
                            ) : (
                              <Invisible
                                alt="비밀번호 표시"
                                stroke={gray60}
                                width={24}
                                height={24}
                              />
                            )
                          }
                        />
                      }
                      isError
                      message={
                        !isMatched && !isReadyToLogin ? (
                          <span className={styles["message-container"]}>
                            <XSmall
                              width={20}
                              height={20}
                              stroke={systemDanger}
                            />
                            <p>입력한 정보가 일치하지 않습니다.</p>
                          </span>
                        ) : undefined
                      }
                    />
                    <Button
                      color="primary"
                      size="small"
                      fullWidth
                      disabled={!isInputFilled}
                      type="submit"
                    >
                      로그인
                    </Button>
                    <span className={styles["register-actions-container"]}>
                      <Button
                        size="xsmall"
                        color="transparent"
                        onClick={handleSignupClick}
                      >
                        회원가입
                      </Button>
                      <div className={styles["vertical-line"]} />
                      <Button
                        size="xsmall"
                        color="transparent"
                        onClick={handleFindPasswordClick}
                      >
                        비밀번호 찾기
                      </Button>
                    </span>

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
                          key={socialImage.type}
                          className={styles[`${socialImage.key}-button`]}
                        >
                          {socialImage}
                        </Button>
                      ))}
                    </section>
                  </form>
                )}
              </main>
            </>
          ),
        },
      ]}
      closeModal={closeModal}
    />
  );
};

export default LoginModal;
