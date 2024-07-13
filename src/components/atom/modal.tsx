import React from "react";
import styles from "../../styles/components/modal.module.scss";


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
          <div className={styles["modal-header"]}><span>{popUpTitle}</span><button onClick={closeModal}>x</button>
          </div>
          <div className={styles["content-title"]}>{contentTitle}</div>
          <div className={styles["content"]}>{content}</div>
          <div className={styles["modal-footer"]}><button>버튼</button><button onClick={closeModal}>닫기</button></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;