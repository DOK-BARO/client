import styles from "@/styles/components/_login_modal.module.scss";
import React from "react";
import { SOCIAL_TYPES } from "@/data/constants.ts";
import SocialAuthButton from "../socialAuthButton/socialAuthButton.tsx";
import { AuthType } from "@/types/AuthType.ts";
import HeaderLogo from "@/components/atom/headerLogo/headerLogo.tsx";
import Modal from "@/components/atom/modal/modal.tsx";

interface LoginModalProps {
  closeModal: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  return (
    <Modal
      content={
        <div className={styles.contents}>
          <header className={styles.header}>
            <HeaderLogo />
            <span className={styles.description}>
              개발자를 위한 똑바로 된 독서 방법
            </span>
          </header>
          <main className={styles.main}>
            {SOCIAL_TYPES.map((socialType) => (
              <SocialAuthButton
                key={socialType}
                authType={AuthType.LOGIN}
                socialType={socialType}
              />
            ))}
          </main>
        </div>
      }
      closeModal={closeModal}
    />
  );
};

export default LoginModal;
