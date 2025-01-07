import React from "react";
import styles from "./_termsModal.module.scss";
import { gray80 } from "@/styles/abstracts/colors";
import { Close } from "@/svg/Close";
import Button from "../Button/Button";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface ModalProps {
  title: string;
  content: string;
  closeModal: () => void;
  className?: string;
}

const TermsModal: React.FC<ModalProps> = ({
  title,
  content,
  closeModal,
  className: customClassName,
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
          {title && <span className={styles["modal-mainTitle"]}>{title}</span>}
        </header>
        <main className={styles["modal-main"]}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            className={`${styles["modal-content"]} ${styles["markdown-content"]}`}
          >
            {content}
          </ReactMarkdown>
        </main>
      </article>
    </div>
  );
};

export default TermsModal;
