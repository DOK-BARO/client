import styles from "../../styles/components/_loginmodal.module.scss";
import Button from "../atom/button.tsx";
import CloseIcon from "@mui/icons-material/Close";
import { gray80 } from "../../styles/abstracts/colors.ts";
import React from "react";
import HeaderLogo from "../atom/headerLogo.tsx";
import { SOCIAL_TYPES } from "../../data/constants.ts";
import SocialAuthButton from "./socialAuthButton.tsx";
import { AuthType } from "../../types/AuthType.ts";

interface LoginModalProps{
  closeModal: () => void;
}
const LoginModal:React.FC<LoginModalProps> = ({
  closeModal,
}) => {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-backdrop"]}>
        <div className={styles["modal-view"]}>
          <div className={styles["modal-header"]}>
            <Button className={styles["modal-button"]} onClick={closeModal}>
              <CloseIcon width={20} height={20} fill={gray80}/>
            </Button>
          </div>
          <div className={styles["title"]}>
            <HeaderLogo />
            <div className={styles["title-text"]}>더 효과적인 북 스터디를 위해</div>
          </div>
          {SOCIAL_TYPES.map((socialType) => (
            <SocialAuthButton
              key={socialType}
              authType={AuthType.LOGIN}
              socialType={socialType}
            />
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

