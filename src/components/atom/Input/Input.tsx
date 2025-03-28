import React from "react";
import styles from "./_input.module.scss";

interface Props {
  id: string;
  value: string | undefined;
  className?: string;
  type?: "text" | "number" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "large" | "medium" | "small";
  isError?: boolean;
  isSuccess?: boolean;
  message?: string | JSX.Element;
  disabled?: boolean;
  label?: string; // left
  hideLabel?: boolean;
  rightLabel?: JSX.Element; // right
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  maxLength?: number;
  color?: "default" | "black" | "primary";
  fullWidth?: boolean;
  maxLengthShow?: boolean;
}

const Input: React.FC<Props> = ({
  id,
  value,
  onChange,
  onKeyDown,
  onPaste,
  className: customClassName,
  type = "text",
  placeholder,
  size = "medium",
  isError = false,
  isSuccess = false,
  message = "",
  disabled = false,
  label, // left
  hideLabel = false,
  rightLabel, // right
  leftIcon,
  rightIcon,
  maxLength,
  color,
  fullWidth = false,
  maxLengthShow = false,
}) => {
  const className = `${styles.input} ${styles[`input--${size}`]} ${
    isError ? styles["input--error"] : ""
  } ${isSuccess ? styles["input--success"] : ""}
  ${styles[`input--${color}`]} ${fullWidth ? styles.full : ""} 
    ${leftIcon ? styles[`input--left-icon-${size}`] : ""} ${
      rightIcon ? styles[`input--right-icon-${size}`] : ""
    } ${customClassName || ""}`;

  return (
    <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
      {label || rightLabel ? (
        <div
          className={`${!hideLabel ? styles["label-container"] : styles["sr-only"]}`}
        >
          {label ? (
            <label className={styles["label"]} htmlFor={id}>
              {label}
            </label>
          ) : null}
          {rightLabel ? rightLabel : null}
        </div>
      ) : null}
      <div className={styles["input-wrapper"]}>
        {leftIcon && <span className={styles["icon-left"]}>{leftIcon}</span>}
        <input
          type={type}
          id={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder={placeholder}
          className={className}
          maxLength={maxLength}
        />
        {rightIcon && <span className={styles["icon-right"]}>{rightIcon}</span>}
      </div>
      {message && (
        <div
          className={
            styles[
              `message${isError ? "--error" : isSuccess ? "--success" : ""}`
            ]
          }
        >
          {message}
        </div>
      )}
      {maxLength && maxLengthShow ? (
        <span className={styles["char-count"]}>
          <b>{value?.length}</b>/{maxLength}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
