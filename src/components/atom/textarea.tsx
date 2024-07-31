import React, { ChangeEvent } from "react";
import styles from "../../styles/components/_textarea.module.scss";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  message?: string;
  isError?: boolean;
  disabled?: boolean;
  label?: string;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  value,
  onChange,
  placeholder,
  message = "",
  isError = false,
  disabled = false,
  label,
  maxLength = 100,
}) => {
  const className = `${styles.textarea}  ${
    isError ? styles["textarea--error"] : ""
  }`;

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
      />
      <div className={styles["message-container"]}>
        <span className={styles[`message${isError ? "--error" : ""}`]}>
          {message}
        </span>
        <span className={styles["char-count"]}>
          <em>{value.length}</em>
          {maxLength && ` / ${maxLength}`}
        </span>
      </div>
    </div>
  );
};

export default Textarea;
