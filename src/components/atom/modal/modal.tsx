import React from "react";
import styles from "./_modal.module.scss";
import { gray80 } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close";
import Button from "../button/button";
interface ModalProps {
  popUpTitle?: string;
  contentTitle?: string;
  content?: JSX.Element;
  buttonText?: string;
  closeModal: () => void;
  className?: string;
}
const Modal: React.FC<ModalProps> = ({
  popUpTitle,
  contentTitle,
  content,
  buttonText,
  closeModal,
  className: customClassName,
}) => {
  const className = `${styles["modal-view"]} ${customClassName}`;
  return (
    // TODO: 시멘틱 태그로 변경하기
    <div>
      <div className={styles["modal-backdrop"]}>
        <div className={className}>
          <div className={styles["modal-header"]}>
            {popUpTitle && <span>{popUpTitle}</span>}
            <Button className={styles["modal-button"]} onClick={closeModal}>
              {/* TODO: 아이콘 변경하기 (Close -> X)*/}
              <Close alt="닫기 버튼" width={20} height={20} stroke={gray80} />
            </Button>
          </div>
          {contentTitle && (
            <div className={styles["content-title"]}>{contentTitle}</div>
          )}
          <div className={styles["content"]}>{content}</div>
          {buttonText ? (
            <div className={styles["modal-footer"]}>
              <Button className={styles["modal-button"]} onClick={() => {}}>
                {buttonText}
              </Button>
              <Button className={styles["modal-button"]} onClick={closeModal}>
                닫기
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
