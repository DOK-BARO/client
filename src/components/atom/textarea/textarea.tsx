import React, { ChangeEvent } from "react";
import styles from "./_textarea.module.scss";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  message?: string;
  isError?: boolean;
  disabled?: boolean;
  label?: string;
  maxLength?: number;
  rows?: number;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  value,
  onChange,
  className: customClassName,
  placeholder,
  message = "",
  isError = false,
  disabled = false,
  label,
  maxLength,
  rows,
  textAreaRef,
}) => {
  const className = `${styles.textarea}  ${
    isError ? styles["textarea--error"] : ""
  } ${customClassName}`;

  return (
    <div className={styles["container"]}>
      {label ? (
        <label className={styles["label"]} htmlFor={id}>
          {label}
        </label>
      ) : (
        <></>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        ref={textAreaRef}
      />
      {message || maxLength ? (
        <div className={styles["message-container"]}>
          {
            <span className={styles[`message${isError ? "--error" : ""}`]}>
              {message}
            </span>
          }
          <span className={styles["char-count"]}>
            <em className={maxLength && value.length >= maxLength ? styles["char-count-max-length"] : ""}>{value.length}</em>/ {maxLength}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Textarea;
