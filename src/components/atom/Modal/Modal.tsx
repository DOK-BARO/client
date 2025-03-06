import React from "react";
import styles from "./_modal.module.scss";
import { gray80 } from "@/styles/abstracts/colors";
import Button, { ButtonColorType } from "../Button/Button";
import { XMedium } from "@/svg/XMedium";

export interface ModalContentType {
  title: string;
  content: JSX.Element;
}

export interface BottomButtonType {
  color: ButtonColorType;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  width?: number;
}

interface Props {
  width?: number;
  title?: string;
  contents?: ModalContentType[];
  bottomButtons?: BottomButtonType[];
  closeModal: () => void;
  showHeaderCloseButton?: boolean;
}

const Modal: React.FC<Props> = ({
  width = 560,
  title,
  contents,
  closeModal,
  bottomButtons,
  showHeaderCloseButton = true,
}) => {
  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal-view"]} style={{ width }}>
        <header className={styles["modal-header"]}>
          {title && <h4 className={styles.title}>{title}</h4>}

          {showHeaderCloseButton ? (
            <Button
              ariaLabel="모달 닫기"
              className={styles["modal-button"]}
              onClick={closeModal}
              icon={<XMedium alt="" width={20} height={20} stroke={gray80} />}
              iconOnly
            />
          ) : null}
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
                  width={button.width}
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
