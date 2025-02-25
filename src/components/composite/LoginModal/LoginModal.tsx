import styles from "./_login_modal.module.scss";
import React, { useEffect, useState } from "react";
import { SOCIAL_TYPES } from "@/data/constants.ts";
import SocialAuthButton from "../SocialAuthButton/SocialAuthButton.tsx";
import HeaderLogo from "@/components/atom/HeaderLogo/HeaderLogo.tsx";
import Modal from "@/components/atom/Modal/Modal.tsx";
import Input from "@/components/atom/Input/Input.tsx";
import { Visible } from "@/svg/Visible.tsx";
import { gray60, systemDanger } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/Button/Button.tsx";
import { Kakao } from "@/svg/auth/Kakao.tsx";
import { Google } from "@/svg/auth/Google.tsx";
import { Naver } from "@/svg/auth/Naver.tsx";
import { Github } from "@/svg/auth/Github.tsx";
import useInput from "@/hooks/useInput.ts";
import { XSmall } from "@/svg/XSmall.tsx";
import { Invisible } from "@/svg/Invisible.tsx";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  isEmailLoginPageAtom,
  loginRedirectUrlAtom,
  socialLoginRedirectUrlAtom,
} from "@/store/authModalAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType.ts";
import toast from "react-hot-toast";
import ROUTES from "@/data/routes.ts";
import { SocialLoginType } from "@/types/SocialLoginType.ts";
import { queryClient } from "@/services/server/queryClient.ts";
import { userKeys } from "@/data/queryKeys.ts";
interface Props {
  closeModal: () => void;
}

const socialLoginMethodButtonImage = [
  {
    type: SocialLoginType.GITHUB,
    icon: <Github width={32} height={32} alt="깃허브" key="GITHUB" />,
  },
  {
    type: SocialLoginType.GOOGLE,
    icon: <Google width={32} height={32} alt="구글" key="GOOGLE" />,
  },
  {
    type: SocialLoginType.KAKAO,
    icon: <Kakao width={32} height={32} alt="카카오" key="KAKAO" />,
  },
  {
    type: SocialLoginType.NAVER,
    icon: <Naver width={32} height={32} alt="네이버" key="NAVER" />,
  },
];

const LoginModal = ({ closeModal }: Props) => {
  // TODO: 전역으로 상태 변경할 수 있도록 해야함
  // const [isEmailSelected, setIsEmailSelected] = useState<boolean>(false);
  const [socialLoginRedirectUrl] = useAtom(socialLoginRedirectUrlAtom);
  const [loginRedirectUrl] = useAtom(loginRedirectUrlAtom);

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
      closeModal();
      navigate(loginRedirectUrl);
      queryClient.invalidateQueries({
        queryKey: userKeys.user(),
      });
      // navigate(0); ?
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
    const method = SocialLoginType.EMAIL.toLocaleLowerCase();
    navigate(ROUTES.REGISTER(method));
  };

  const handleFindPasswordClick = () => {
    closeModal();
    navigate(ROUTES.FIND_PASSWORD);
  };

  const handleSocialAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    sessionStorage.setItem("social-login-pending", "true");
    const socialType = e.currentTarget.value as SocialLoginType;

    const redirectUrl = socialLoginRedirectUrl;

    localStorage.setItem("social", socialType.toLowerCase());
    authService.socialSignupOrLogin({
      socialType,
      redirectUrl,
    });
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
                              alt=""
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
                      {socialLoginMethodButtonImage.map((socialItem) => (
                        <Button
                          iconOnly
                          key={socialItem.type}
                          className={
                            styles[
                              `${socialItem.type?.toLocaleLowerCase()}-button`
                            ]
                          }
                          onClick={handleSocialAuth}
                          value={socialItem.type}
                        >
                          {socialItem.icon}
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
