import React from "react";
import styles from "../../styles/components/_modal.module.scss";
import Button from "./button";

interface ModalProps {
  popUpTitle: string;
  contentTitle: string;
  content?: string;
  closeModal: () => void;
}
const Modal: React.FC<ModalProps> = ({
  popUpTitle,
  contentTitle,
  content,
  closeModal,
}) => {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-backdrop"]}>
        <div className={styles["modal-view"]}>
          <div className={styles["modal-header"]}>
            <span>{popUpTitle}</span>
            <Button className={styles["modal-button"]} onClick={closeModal}>
              x
            </Button>
          </div>
          <div className={styles["content-title"]}>{contentTitle}</div>
          <div className={styles["content"]}>{content}</div>
          <div className={styles["modal-footer"]}>
            <Button className={styles["modal-button"]} onClick={() => {}}>
              버튼
            </Button>
            <Button className={styles["modal-button"]} onClick={closeModal}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
