import React from "react";
import styles from "./_modal.module.scss";
import { gray80 } from "@/styles/abstracts/colors";
import Button, { ButtonColorProps } from "../Button/Button";
import { XMedium } from "@/svg/XMedium";

export interface ModalContentProps {
  title: string;
  content: JSX.Element;
}

export interface BottomButtonProps {
  color: ButtonColorProps;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ModalProps {
  width?: number;
  title?: string;
  contents?: ModalContentProps[];
  bottomButtons?: BottomButtonProps[];
  closeModal: () => void;
  showHeaderCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  width = 560,
  title,
  contents,
  closeModal,
  bottomButtons,
  showHeaderCloseButton = true,
}) => {
  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal-view"]} style={{ width: width }}>
        <header className={styles["modal-header"]}>
          {title && <h4 className={styles.title}>{title}</h4>}

          {showHeaderCloseButton ? (
            <Button
              className={styles["modal-button"]}
              onClick={closeModal}
              icon={
                <XMedium
                  alt="닫기 버튼"
                  width={20}
                  height={20}
                  stroke={gray80}
                />
              }
              iconOnly
            />
          ) : null}
          {/* TODO: 아이콘 변경하기 (Close -> X)*/}
        </header>
        <main className={styles["modal-main"]}>
          {contents?.map((content, index) => (
            <React.Fragment key={content.title}>
              <div className={styles["content-container"]}>
                {content.title !== "" ? (
                  <h5 className={styles["content-title"]}>{content.title}</h5>
                ) : null}
                <div className={styles["content-content"]}>
                  {content?.content}
                </div>
              </div>
              {index < contents.length - 1 && <div className={styles.line} />}
            </React.Fragment>
          ))}
        </main>

        {bottomButtons ? (
          <footer className={styles["modal-footer"]}>
            <div className={styles["button-container"]}>
              {bottomButtons.map((button) => (
                <Button
                  key={button.text}
                  color={button.color}
                  onClick={button.onClick}
                  size="small"
                  disabled={button.disabled}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </footer>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
