import React from "react";
import styles from "./_termsModal.module.scss";
import { gray80 } from "@/styles/abstracts/colors";
import { Close } from "@/svg/close";
import Button from "../button/button";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface ModalProps {
  mainTitle: string;
  subTitle?: JSX.Element;
  content: string;
  closeModal: () => void;
  className?: string;
  //   isLoading: boolean;
}

const TermsModal: React.FC<ModalProps> = ({
  mainTitle,
  subTitle,
  content,
  closeModal,
  className: customClassName,
  //   isLoading,
}) => {
  const className = `${styles["modal-view"]} ${customClassName}`;
  return (
    <div className={styles["modal-backdrop"]}>
      <article className={className}>
        <header className={styles["modal-header"]}>
          <Button
            className={styles["modal-button"]}
            onClick={closeModal}
            iconOnly
          >
            <Close
              alt="닫기 버튼"
              width={20}
              height={20}
              stroke={gray80}
              strokeWidth={1.4}
            />
          </Button>
          {mainTitle && (
            <span className={styles["modal-mainTitle"]}>{mainTitle}</span>
          )}
        </header>
        <main className={styles["modal-main"]}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            className={styles["modal-content"]}
          >
            {content}
          </ReactMarkdown>
        </main>
      </article>
    </div>
  );
};

export default TermsModal;
