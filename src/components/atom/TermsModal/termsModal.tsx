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
}

const TermsModal: React.FC<ModalProps> = ({
  mainTitle,
  subTitle,
  contentTitle,
  content,
  closeModal,
  className: customClassName,
}) => {
  console.log(content);
  //   const markdownText = `**제1조 [목적]**

  // 본 약관은 독바로(이하 '회사')에서 제공하는 콘텐츠 서비스(웹, 모바일 서비스 등을 포함합니다) 및 제반 서비스를 이용함에 있어 '회원’과 ‘회사' 간의 권리, 의무 및 책임사항, 서비스 이용조건 등 기본적인 사항을 규정하는 것을 목적으로 합니다.

  // **제2조 [용어의 정의]** 유효하게 적용될 수 있습니다. `;

  const markdownText = "1. 콘텐츠";

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
        {subTitle && <div className={styles["modal-subTitle"]}>{subTitle}</div>}
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          className={styles["modal-content"]}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default TermsModal;
