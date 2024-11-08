import React from "react";
import styles from "./_termsModal.module.scss";
import { gray80 } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close";
import Button from "../button/button";
interface ModalProps {
  mainTitle: string;
  subTitle?: JSX.Element;
  content: JSX.Element;
  closeModal: () => void;
  className?: string;
}
const TermsModal: React.FC<ModalProps> = ({
  mainTitle,
  subTitle,
  contentTitle,
  content,
  closeModal,
  className: customClassName,
}) => {
  const className = `${styles["modal-view"]} ${customClassName}`;
  return (
    <div>
      <div className={styles["modal-backdrop"]}>
        <div className={className}>
          <div className={styles["modal-header"]}>
            {mainTitle && <span>{mainTitle}</span>}
            <Button className={styles["modal-button"]} onClick={closeModal}>
              <Close alt="닫기 버튼" width={20} height={20} stroke={gray80} />
            </Button>
          </div>
          {subTitle && (
            <div className={styles["content-title"]}>{subTitle}</div>
          )}
          <div className={styles["content"]}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
