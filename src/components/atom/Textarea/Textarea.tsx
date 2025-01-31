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
  maxLengthShow?: boolean;
  rows?: number;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  autoFocus?: boolean;
  fullWidth?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  size?: "large" | "medium" | "small";
  type?: "option-label";
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
  maxLengthShow,
  rows,
  textAreaRef,
  autoFocus,
  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  fullWidth = false,
  size = "medium",
  type = "",
}) => {
  const className = `${styles.textarea} ${styles[type]} ${styles[`textarea--${size}`]} ${
    isError ? styles["textarea--error"] : ""
  } ${customClassName}  ${fullWidth ? styles["full"] : ""}`;

  return (
    <div
      className={`${styles["container"]} ${fullWidth ? styles["full"] : ""}`}
    >
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
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
      />
      {message ||
      (maxLength && maxLengthShow) ||
      (maxLength && maxLength <= value.length) ? (
        <div className={styles["message-container"]}>
          {
            <span className={styles[`message${isError ? "--error" : ""}`]}>
              {message}
            </span>
          }
          <span className={styles["char-count"]}>
            <em
              className={
                maxLength && value.length >= maxLength
                  ? styles["char-count-max-length"]
                  : ""
              }
            >
              {value.length}
            </em>
            /{maxLength}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Textarea;
