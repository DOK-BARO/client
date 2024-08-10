import styles from "../../styles/components/_loginmodal.module.scss";
import Button from "../atom/button.tsx";
import CloseIcon from "@mui/icons-material/Close";
import { gray80 } from "../../styles/abstracts/colors.ts";
import React from "react";
import HeaderLogo from "../atom/headerLogo.tsx";

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
          <div className={styles["content"]}>
            <Button className={styles["github-auth-button"]} onClick={() => {}}>
              <img src="/src/assets/svg/github-logo.svg" alt="깃허브 로그인 버튼"></img>
              <div>깃허브계정으로 로그인</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

